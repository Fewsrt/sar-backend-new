const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const ThaiBahtText = require('thai-baht-text')

// Get all tax invoices
const getAllTaxInvoices = async () => {
    return await prisma.taxInvoice.findMany({
        include: {
            car: true,
            customer: true,
        },
    });
};

// Get tax invoice by ID
const getTaxInvoiceById = async (invoiceId) => {
    return await prisma.taxInvoice.findUnique({
        where: { invoice_id: parseInt(invoiceId) },
        include: {
            car: true,
            customer: true,
        },
    });
};

// Get tax invoices by customer ID
const getTaxInvoicesByCustomerId = async (customerId) => {
    return await prisma.taxInvoice.findMany({
        where: { customer_id: parseInt(customerId) },
        include: {
            car: true,
            customer: true,
        },
    });
};

// Get tax invoices by car ID
const getTaxInvoicesByCarId = async (carId) => {
    return await prisma.taxInvoice.findMany({
        where: { car_id: parseInt(carId) },
        include: {
            car: true,
            customer: true,
        },
    });
};

// เพิ่มฟังก์ชันสำหรับสร้าง invoice_no
const generateInvoiceNo = async () => {
    const today = new Date();
    const year = today.getFullYear().toString().slice(-2);
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const prefix = `IV${year}${month}`;

    // หาเลขล่าสุดของเดือนปัจจุบัน
    const lastInvoice = await prisma.taxInvoice.findFirst({
        where: {
            invoice_no: {
                startsWith: prefix
            }
        },
        orderBy: {
            invoice_no: 'desc'
        }
    });

    let sequenceNumber = 1;
    if (lastInvoice) {
        // ดึงตัวเลขจาก invoice_no ล่าสุด และบวกเพิ่ม 1
        const lastSequence = parseInt(lastInvoice.invoice_no.slice(-4));
        sequenceNumber = lastSequence + 1;
    }

    // สร้างเลขใหม่โดยเติม 0 ข้างหน้าให้ครบ 4 หลัก
    return `${prefix}${sequenceNumber.toString().padStart(4, '0')}`;
};

// Create tax invoice
const createTaxInvoice = async ({
    car_id,
    customer_id,
    customer_tax_id,
    customer_code,
    car_code,
    price_before_vat,
    vat_amount,
    total_price,
    invoice_date
}) => {
    return await prisma.$transaction(async (prisma) => {
        // 1. Generate invoice_no
        const invoice_no = await generateInvoiceNo();

        // 2. หา carTaxDetails ที่มีอยู่แล้ว (ไม่ต้องสร้างใหม่เพราะถูกสร้างตอน createCar)
        const existingTaxDetails = await prisma.carTaxDetails.findFirst({
            where: { car_id: parseInt(car_id) }
        });

        if (!existingTaxDetails) {
            throw new Error('Car tax details not found');
        }

        // 3. อัพเดท tax_invoice_sale_date
        await prisma.carTaxDetails.update({
            where: { id: existingTaxDetails.id },
            data: {
                tax_invoice_sale_date: new Date(invoice_date)
            }
        });

        // 4. สร้างใบกำกับภาษี
        const taxInvoice = await prisma.taxInvoice.create({
            data: {
                invoice_no,
                invoice_date: new Date(invoice_date),
                customer_id: parseInt(customer_id),
                customer_tax_id,
                customer_code,
                car_id: parseInt(car_id),
                car_code,
                price_before_vat: parseFloat(price_before_vat),
                vat_amount: parseFloat(vat_amount),
                total_price: parseFloat(total_price)
            },
            include: {
                car: true,
                customer: true
            }
        });

        // 5. สร้าง relation ในตาราง junction
        await prisma.carSaleTaxInvoice.create({
            data: {
                car_tax_details_id: existingTaxDetails.id,
                invoice_id: taxInvoice.invoice_id
            }
        });

        return taxInvoice;
    });
};

// Update tax invoice
const updateTaxInvoice = async (invoiceId, {
    invoice_date,
    sale_price_before_vat,
    vat_7_percent,
    sale_price_incl_vat,
    invoice_type
}) => {
    return await prisma.taxInvoice.update({
        where: { invoice_id: parseInt(invoiceId) },
        data: {
            invoice_date: invoice_date ? new Date(invoice_date) : undefined,
            sale_price_before_vat: sale_price_before_vat ? parseFloat(sale_price_before_vat) : undefined,
            vat_7_percent: vat_7_percent ? parseFloat(vat_7_percent) : undefined,
            sale_price_incl_vat: sale_price_incl_vat ? parseFloat(sale_price_incl_vat) : undefined,
            invoice_type
        },
        include: {
            car: true,
            customer: true,
        },
    });
};

// Delete tax invoice
const deleteTaxInvoice = async (invoiceId) => {
    return await prisma.taxInvoice.delete({
        where: { invoice_id: parseInt(invoiceId) },
    });
};

// Get car tax invoices
const getCarTaxInvoices = async (carId) => {
    return await prisma.carTaxDetails.findUnique({
        where: {
            car_id: parseInt(carId)
        },
        include: {
            car: true,
            sale_tax_invoices: {
                include: {
                    taxInvoice: {
                        include: {
                            customer: true
                        }
                    }
                }
            }
        }
    });
};

const generateTaxInvoicePDF = async (invoiceData) => {
    // กำหนด font ไทย
    const thSarabunPath = path.join(__dirname, '../fonts/THSarabunNew.ttf');
    const thSarabunBoldPath = path.join(__dirname, '../fonts/THSarabunNewBold.ttf');

    const doc = new PDFDocument({
        size: 'A4',
        margin: 50,
        font: thSarabunPath
    });

    // ลงทะเบียน fonts
    doc.registerFont('THSarabun', thSarabunPath);
    doc.registerFont('THSarabunBold', thSarabunBoldPath);

    // Company Logo
    // doc.image('path/to/logo.png', 50, 45, { width: 150 })
    //    .fontSize(10);
    
    // Company Info
    doc.font('THSarabunBold')
        .fontSize(18)
        .text('บริษัท แสงอรุณออโต้คาร์ จำกัด (สำนักงานใหญ่)', 50, 30)
        .font('THSarabun')
        .fontSize(16)
        .text('54/6 หมู่ที่2 ตำบลคอกกระบือ อำเภอเมืองสมุทรสาคร จังหวัดสมุทรสาคร 74000', 50, 45)
        .text('โทรศัพท์/โทรสาร 085-1616-599, 095-0589999', 50, 60)
        .text(`เลขประจำตัวผู้เสียภาษี 0745558002241`, 50, 75);

    // Invoice Title
    doc.font('THSarabunBold')
        .fontSize(20)
        .text('ต้นฉบับใบกำกับภาษี / ใบเสร็จรับเงิน', 50, 100, { align: 'center' });

    doc.rect(50, 130, 500, 570).stroke();
    // แบ่งส่วนบน
    doc.moveTo(350, 130).lineTo(350, 250); // เส้นแนวตั้งกลาง
    doc.moveTo(50, 250).lineTo(550, 250); // เส้นแนวนอน
    // วาดกรอบหลักและเส้นแนวตั้ง
    const tableTop = 250;
    const tableBottom = 500; // จุดสิ้นสุดที่ชนกรอบล่าง

    // กรอบหลัก
    doc.rect(50, tableTop, 500, tableBottom - tableTop).stroke();

    // เส้นแนวตั้งแบ่งคอลัมน์ (ยาวตลอดจากบนลงล่าง)
    doc.moveTo(90, tableTop).lineTo(90, tableBottom); // เส้นหลังลำดับ
    doc.moveTo(300, tableTop).lineTo(300, tableBottom); // เส้นหลังรายละเอียด
    doc.moveTo(380, tableTop).lineTo(380, tableBottom); // เส้นหลังจำนวน
    doc.moveTo(460, tableTop).lineTo(460, tableBottom); // เส้นหลังหน่วยละ
    doc.stroke();

    // Table Headers
    doc.font('THSarabunBold')
        .fontSize(16)
        .text('ลำดับ', 55, tableTop + 10)
        .text('Item.', 55, tableTop + 25)
        .text('รายละเอียด', 100, tableTop + 10)
        .text('Description', 100, tableTop + 25)
        .text('จำนวน', 310, tableTop + 10)
        .text('Quantity', 310, tableTop + 25)
        .text('หน่วยละ', 390, tableTop + 10)
        .text('Unit', 390, tableTop + 25)
        .text('จำนวนเงิน', 470, tableTop + 10)
        .text('Amount', 470, tableTop + 25);

    // เส้นแนวนอนใต้หัวตาราง
    doc.moveTo(50, tableTop + 50).lineTo(550, tableTop + 50).stroke();

    // วาดกรอบส่วนล่าง (ต่อจากตาราง)
    const totalsY = 500;
    doc.rect(50, totalsY, 500, 150).stroke();

    // Customer Info (ซ้าย)
    doc.font('THSarabun')
        .fontSize(16)
        .text(`นามลูกค้า ${invoiceData.customer.name}`, 60, 140)
        .text(`สาขา`, 60, 160)
        .text(`เลขประจำตัวผู้เสียภาษี ${invoiceData.customer_tax_id}`, 60, 180)
        .text(`Taxpayer Identification Number`, 60, 195)
        .text(`ที่อยู่: ${invoiceData.customer.address}`, 60, 215);

    // Invoice Info (ขวา)
    doc.text(`วันที่`, 356, 140)
        .text(`Date`, 356, 155)
        .text(`เลขที่ใบกำกับภาษี`, 356, 180)
        .text(`Invoice No.`, 356, 195)
        .text(`รหัสลูกค้า`, 356, 210)
        .text(`รหัสรถยนต์`, 356, 225);

    // Invoice Values (ขวาสุด)
    doc.text(new Date(invoiceData.invoice_date).toLocaleDateString('th-TH'), 450, 140)
        .text(invoiceData.invoice_no, 450, 180)
        .text(invoiceData.customer_code, 450, 210)
        .text(invoiceData.car_code, 450, 225);

    // Car Details and Pricing
    doc.font('THSarabun');
    const carDetails = 300;


    doc.text('1', 60, carDetails)
        .text('รถยนต์', 100, carDetails)
        .text(`ยี่ห้อ ${invoiceData.car.brand_name} ${invoiceData.car.model_name}`, 100, carDetails + 20)
        .text(`เลขทะเบียน ${invoiceData.car.license_plate_no}`, 100, carDetails + 40)
        .text(`สี ${invoiceData.car.color_name}`, 100, carDetails + 60)
        .text(`เลขตัวรถ ${invoiceData.car.chassis_no}`, 100, carDetails + 80)
        .text(`เลขเครื่องยนต์ ${invoiceData.car.engine_no}`, 100, carDetails + 100);

    // จำนวน (ตรงกลาง)
    doc.text('1', 140, carDetails, { align: 'center' });

    // หน่วยละ (ขวา)
    doc.text(`${invoiceData.price_before_vat.toLocaleString('th-TH', { minimumFractionDigits: 2 })}`, 400, carDetails);

    // จำนวนเงิน (ขวาสุด)
    doc.text(`${invoiceData.price_before_vat.toLocaleString('th-TH', { minimumFractionDigits: 2 })}`, 480, carDetails);

    // หมายเหตุด้านซ้าย
    doc.font('THSarabun')
        .fontSize(14)
        .text('หมายเหตุ: แก้ไขใบส่งของกรุณาติดต่อภายใน 7 วัน', 60, totalsY + 10)
        .text('             หากพ้นกำหนดจะไม่รับผิดชอบใดๆทั้งสิ้น', 60, totalsY + 25)
        .text('บัญชีสำหรับโอนเงิน ชื่อ ..............................................................................', 60, totalsY + 45)
        .text('ธนาคาร............................. บัญชี............................ สาขา............................', 60, totalsY + 65)
        .text('เลขที่บัญชี..................................................', 60, totalsY + 85)
        .text('กรุณาสั่งจ่ายเช็คขีดคร่อมในนาม "................................................................"', 60, totalsY + 105);

    // ยอดเงินด้านขวา
    doc.font('THSarabunBold')
        .text('รวมเป็นเงิน', 350, totalsY + 45)
        .text('Total', 350, totalsY + 60)
        .text('ภาษีมูลค่าเพิ่ม7%', 350, totalsY + 80)
        .text('Vat 7%', 350, totalsY + 95)
        .text('รวมราคาทั้งสิ้น', 350, totalsY + 115)
        .text('Grand Total', 350, totalsY + 130);

    // จำนวนเงิน (ตัวเลข)
    doc.font('THSarabun')
        .text(`${invoiceData.price_before_vat.toLocaleString('th-TH', { minimumFractionDigits: 2 })}`, 480, totalsY + 45)
        .text(`${invoiceData.vat_amount.toLocaleString('th-TH', { minimumFractionDigits: 2 })}`, 480, totalsY + 80)
        .text(`${invoiceData.total_price.toLocaleString('th-TH', { minimumFractionDigits: 2 })}`, 480, totalsY + 115);

    // จำนวนเงินเป็นตัวอักษร (อยู่บรรทัดเดียวกับ Grand Total)
    doc.font('THSarabunBold')
        .text(ThaiBahtText(invoiceData.total_price), 150, totalsY + 125);

    // ข้อความยืนยันการรับสินค้า
    doc.rect(50, totalsY + 150, 500, 50).stroke();
    doc.text('ได้รับสินค้าตามรายการในสภาพเรียบร้อย', 60, totalsY + 160)
        .text('RECEIVED THE ABOVE IN GOODS AND CONDITION', 60, totalsY + 175);

    // Signatures
    doc.font('THSarabunBold')
        .fontSize(16)
        .text('ลงชื่อ...................................ผู้รับเงิน', 80, totalsY + 220)
        .text('ลงชื่อ...................................ผู้รับสินค้า', 350, totalsY + 220);

    return doc;
};

// เพิ่มฟังก์ชันสำหรับสร้างโฟลเดอร์ถ้ายังไม่มี
const ensureDirectoryExists = (dirPath) => {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
};

// ปรับฟังก์ชัน createAndSendInvoicePDF
const createAndSendInvoicePDF = async (invoiceData) => {
    const doc = await generateTaxInvoicePDF(invoiceData);

    // กำหนด path ที่จะเก็บไฟล์
    const uploadsDir = path.join(__dirname, '..', 'uploads');
    const invoicesDir = path.join(uploadsDir, 'invoices');

    // สร้างโฟลเดอร์ถ้ายังไม่มี
    ensureDirectoryExists(uploadsDir);
    ensureDirectoryExists(invoicesDir);

    const fileName = `tax_invoice_${invoiceData.invoice_no}.pdf`;
    const filePath = path.join(invoicesDir, fileName);

    return new Promise((resolve, reject) => {
        const stream = fs.createWriteStream(filePath);
        doc.pipe(stream);

        stream.on('finish', () => {
            resolve(filePath);
        });

        stream.on('error', (error) => {
            console.error('Error writing PDF:', error);
            reject(error);
        });

        doc.end();
    });
};

// ปรับ controller สำหรับดาวน์โหลด PDF
const downloadTaxInvoicePDF = async (req, res) => {
    const { invoiceId } = req.params;

    try {
        const invoice = await getTaxInvoiceById(invoiceId);
        if (!invoice) {
            return res.status(404).json({ error: 'Tax invoice not found' });
        }

        const pdfPath = await createAndSendInvoicePDF(invoice);

        // ตรวจสอบว่าไฟล์มีอยู่จริง
        if (!fs.existsSync(pdfPath)) {
            return res.status(404).json({ error: 'PDF file not found' });
        }

        res.download(pdfPath, `tax_invoice_${invoice.invoice_no}.pdf`, (err) => {
            if (err) {
                console.error('Error downloading file:', err);
                res.status(500).json({ error: 'Error downloading file' });
            }

            // ลบไฟล์หลังจากดาวน์โหลดเสร็จ (optional)
            // fs.unlinkSync(pdfPath);
        });
    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).json({ error: 'Unable to generate PDF' });
    }
};

module.exports = {
    getAllTaxInvoices,
    getTaxInvoiceById,
    getTaxInvoicesByCustomerId,
    getTaxInvoicesByCarId,
    createTaxInvoice,
    updateTaxInvoice,
    deleteTaxInvoice,
    getCarTaxInvoices,
    createAndSendInvoicePDF,
    downloadTaxInvoicePDF
}; 