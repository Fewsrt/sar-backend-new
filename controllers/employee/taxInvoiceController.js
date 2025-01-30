const taxInvoiceModel = require('../../models/taxInvoice');

// Get all tax invoices
const getAllTaxInvoices = async (req, res) => {
    try {
        const invoices = await taxInvoiceModel.getAllTaxInvoices();
        res.json(invoices);
    } catch (error) {
        console.error('Error in getAllTaxInvoices:', error);
        res.status(500).json({ error: 'Unable to fetch tax invoices' });
    }
};

// Get tax invoice by ID
const getTaxInvoiceById = async (req, res) => {
    const { invoiceId } = req.params;
    try {
        const invoice = await taxInvoiceModel.getTaxInvoiceById(invoiceId);
        if (!invoice) {
            return res.status(404).json({ error: 'Tax invoice not found' });
        }
        res.json(invoice);
    } catch (error) {
        console.error('Error in getTaxInvoiceById:', error);
        res.status(500).json({ error: 'Unable to fetch tax invoice' });
    }
};

// Get tax invoices by customer ID
const getTaxInvoicesByCustomerId = async (req, res) => {
    const { customerId } = req.params;
    try {
        const invoices = await taxInvoiceModel.getTaxInvoicesByCustomerId(customerId);
        if (!invoices || invoices.length === 0) {
            return res.status(404).json({ error: 'No tax invoices found for this customer' });
        }
        res.json(invoices);
    } catch (error) {
        console.error('Error in getTaxInvoicesByCustomerId:', error);
        res.status(500).json({ error: 'Unable to fetch customer tax invoices' });
    }
};

// Get tax invoices by car ID
const getTaxInvoicesByCarId = async (req, res) => {
    const { carId } = req.params;
    try {
        const invoices = await taxInvoiceModel.getTaxInvoicesByCarId(carId);
        if (!invoices || invoices.length === 0) {
            return res.status(404).json({ error: 'No tax invoices found for this car' });
        }
        res.json(invoices);
    } catch (error) {
        console.error('Error in getTaxInvoicesByCarId:', error);
        res.status(500).json({ error: 'Unable to fetch car tax invoices' });
    }
};

// Create tax invoice
const createTaxInvoice = async (req, res) => {
    try {
        const newInvoice = await taxInvoiceModel.createTaxInvoice(req.body);
        res.status(201).json(newInvoice);
    } catch (error) {
        console.error('Error in createTaxInvoice:', error);
        res.status(500).json({ error: 'Unable to create tax invoice' });
    }
};

// Update tax invoice
const updateTaxInvoice = async (req, res) => {
    const { invoiceId } = req.params;
    const {
        invoice_date,
        sale_price_before_vat,
        vat_7_percent,
        sale_price_incl_vat,
        invoice_type
    } = req.body;

    try {
        const updatedInvoice = await taxInvoiceModel.updateTaxInvoice(
            invoiceId,
            {
                invoice_date,
                sale_price_before_vat,
                vat_7_percent,
                sale_price_incl_vat,
                invoice_type
            }
        );
        res.json(updatedInvoice);
    } catch (error) {
        console.error('Error in updateTaxInvoice:', error);
        res.status(500).json({ error: 'Unable to update tax invoice' });
    }
};

// Delete tax invoice
const deleteTaxInvoice = async (req, res) => {
    const { invoiceId } = req.params;
    try {
        await taxInvoiceModel.deleteTaxInvoice(invoiceId);
        res.json({ message: 'Tax invoice deleted successfully' });
    } catch (error) {
        console.error('Error in deleteTaxInvoice:', error);
        res.status(500).json({ error: 'Unable to delete tax invoice' });
    }
};

// Get car tax invoices
const getCarTaxInvoices = async (req, res) => {
    const { car_id } = req.params;
    
    try {
        const taxDetails = await taxInvoiceModel.getCarTaxInvoices(parseInt(car_id));
        if (!taxDetails) {
            return res.status(404).json({ error: 'No tax details found for this car' });
        }
        
        res.json(taxDetails);
    } catch (error) {
        console.error('Error fetching car tax invoices:', error);
        res.status(500).json({ error: 'Unable to fetch car tax invoices' });
    }
};

// ปรับ controller สำหรับดาวน์โหลด PDF
const downloadTaxInvoicePDF = async (req, res) => {
    const { invoiceId } = req.params;
    
    try {
        // ดึงข้อมูลใบกำกับภาษี
        const invoice = await taxInvoiceModel.getTaxInvoiceById(invoiceId);
        if (!invoice) {
            return res.status(404).json({ error: 'Tax invoice not found' });
        }

        // สร้าง PDF
        const pdfPath = await taxInvoiceModel.createAndSendInvoicePDF(invoice);
        
        // ส่งไฟล์กลับไป
        res.download(pdfPath, `tax_invoice_${invoice.invoice_no}.pdf`);
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
    downloadTaxInvoicePDF
}; 