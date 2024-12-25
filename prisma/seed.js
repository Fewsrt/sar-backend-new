const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // ลบข้อมูลเก่าในตารางที่เชื่อมโยงกัน
    await prisma.subdistrict.deleteMany();
    await prisma.district.deleteMany();
    await prisma.province.deleteMany();

    // สร้าง Province จำลอง
    const createdProvinces = await prisma.province.createMany({
        data: [
            { province_name: 'Bangkok' },
            { province_name: 'Phuket' },
        ],
    });

    // หา province_id ที่ถูกต้องหลังจากสร้าง Province
    const bangkok = await prisma.province.findUnique({
        where: { province_name: 'Bangkok' },
    });

    const phuket = await prisma.province.findUnique({
        where: { province_name: 'Phuket' },
    });

    // สร้าง District จำลองโดยอ้างอิง province_id จากข้อมูลที่สร้างแล้ว
    const districts = await prisma.district.createMany({
        data: [
            { district_name: 'Bang Rak', province_id: bangkok.province_id },
            { district_name: 'Patong', province_id: phuket.province_id },
        ],
    });

    // สร้าง Subdistrict จำลอง
    const subdistricts = await prisma.subdistrict.createMany({
        data: [
            { subdistrict_name: 'Si Lom', district_id: 1 },
            { subdistrict_name: 'Kathu', district_id: 2 },
        ],
    });

    // สร้าง CarBrand จำลอง
    const carBrands = await prisma.carBrand.createMany({
        data: [
            { brand_name: 'Toyota' },
            { brand_name: 'Honda' },
        ],
    });

    // สร้าง CarModel จำลอง
    const carModels = await prisma.carModel.createMany({
        data: [
            { model_name: 'Corolla', brand_id: 1 },
            { model_name: 'Civic', brand_id: 2 },
        ],
    });

    // สร้าง CarSubModel จำลอง
    const carSubModels = await prisma.carSubModel.createMany({
        data: [
            { submodel_name: 'Altis', model_id: 1 },
            { submodel_name: 'Turbo', model_id: 2 },
        ],
    });

    // สร้าง Employee จำลอง
    const employees = await prisma.employee.createMany({
        data: [
            {
                employee_code: "EMP001",
                full_name: "John Doe",
                position: "Sales",
                branch_province: "Bangkok",
                phone: "0800000000",
                email: "johndoe@example.com",
                password: "securepassword",
                branch_id: 1,
                employment_status: 'ACTIVE', // เพิ่มค่า employment_status
            },
            {
                employee_code: "EMP002",
                full_name: "Jane Smith",
                position: "Accounting",
                branch_province: "Chiang Mai",
                phone: "0811111111",
                email: "janesmith@example.com",
                password: "securepassword",
                branch_id: 2,
                employment_status: 'ACTIVE', // เพิ่มค่า employment_status
            },
        ],
    });


    // สร้าง Car จำลอง
    const cars = await prisma.car.createMany({
        data: [
            {
                car_code: 'CAR001',
                brand_id: 1,
                model_id: 1,
                submodel_id: 1,
                registration_no: '1กก1234',
            },
            {
                car_code: 'CAR002',
                brand_id: 2,
                model_id: 2,
                submodel_id: 2,
                registration_no: '2ขข5678',
            },
        ],
    });

    // สร้าง Customer จำลอง
    const customers = await prisma.customer.createMany({
        data: [
            {
                customer_id: 'CUS001',
                first_name: 'Alice',
                last_name: 'Wonderland',
                phone: '0822222222',
                email: 'alice@example.com',
                subdistrict_id: 1,
                district_id: 1,
                province_id: 1,
                tax_id: '1234567890123',
            },
            {
                customer_id: 'CUS002',
                first_name: 'Bob',
                last_name: 'Builder',
                phone: '0833333333',
                email: 'bob@example.com',
                subdistrict_id: 2,
                district_id: 2,
                province_id: 2,
                tax_id: '9876543210987',
            },
        ],
    });

    // สร้าง FollowUp จำลอง
    const followUps = await prisma.followUp.createMany({
        data: [
            {
                followUpId: 'FU001',
                customer_id: 'CUS001',
                employee_id: 'EMP001',
                followUpDate: new Date(),
                status: 'Interested',
            },
            {
                followUpId: 'FU002',
                customer_id: 'CUS002',
                employee_id: 'EMP002',
                followUpDate: new Date(),
                status: 'Reserved',
            },
        ],
    });

    // สร้าง Sale จำลอง
    const sales = await prisma.sale.createMany({
        data: [
            {
                car_id: 1,
                customer_id: 'CUS001',
                sale_date: new Date(),
                sale_price: 500000,
                salesperson_id: 'EMP001',
            },
            {
                car_id: 2,
                customer_id: 'CUS002',
                sale_date: new Date(),
                sale_price: 600000,
                salesperson_id: 'EMP002',
            },
        ],
    });

    // สร้าง Reservation จำลอง
    const reservations = await prisma.reservation.createMany({
        data: [
            {
                customer_id: 'CUS001',
                car_id: 1,
                reservation_date: new Date(),
                status: 'Confirmed',
            },
            {
                customer_id: 'CUS002',
                car_id: 2,
                reservation_date: new Date(),
                status: 'Pending',
            },
        ],
    });

    // สร้าง CarInspection จำลอง
    const carInspections = await prisma.carInspection.createMany({
        data: [
            {
                car_id: 1,
                inspection_date: new Date(),
                inspector_id: 'EMP001',
                inspection_notes: 'Good condition',
            },
            {
                car_id: 2,
                inspection_date: new Date(),
                inspector_id: 'EMP002',
                inspection_notes: 'Requires minor repairs',
            },
        ],
    });

    // สร้าง Maintenance จำลอง
    const maintenances = await prisma.maintenance.createMany({
        data: [
            {
                car_id: 1,
                maintenance_date: new Date(),
                description: 'Oil change',
                cost: 1500,
                employee_id: 'EMP001',
            },
            {
                car_id: 2,
                maintenance_date: new Date(),
                description: 'Brake replacement',
                cost: 3000,
                employee_id: 'EMP002',
            },
        ],
    });

    // สร้าง Accounting จำลอง
    const accountings = await prisma.accounting.createMany({
        data: [
            {
                transaction_type: 'SALE',
                amount: 500000,
                transaction_date: new Date(),
                car_id: 1,
                branch_id: 1,
            },
            {
                transaction_type: 'PURCHASE',
                amount: 400000,
                transaction_date: new Date(),
                car_id: 2,
                branch_id: 2,
            },
        ],
    });

    // สร้าง Supplier จำลอง
    const suppliers = await prisma.supplier.createMany({
        data: [
            {
                supplier_code: 'SUP001',
                supplier_name: 'Auto Parts Co.',
                phone: '0891234567',
                email: 'autoparts@example.com',
                subdistrict_id: 1,
                district_id: 1,
                province_id: 1,
                tax_id: '1111111111111',
                branch_id: 1,
                type: 'Parts',
            },
            {
                supplier_code: 'SUP002',
                supplier_name: 'Best Tires Co.',
                phone: '0899876543',
                email: 'besttires@example.com',
                subdistrict_id: 2,
                district_id: 2,
                province_id: 2,
                tax_id: '2222222222222',
                branch_id: 2,
                type: 'Tires',
            },
        ],
    });

    // สร้าง CustomerPurchaseHistory จำลอง
    const customerPurchaseHistories = await prisma.customerPurchaseHistory.createMany({
        data: [
            {
                customer_id: 'CUS001',
                car_id: 1,
                purchase_date: new Date(),
                purchase_price: 500000,
            },
            {
                customer_id: 'CUS002',
                car_id: 2,
                purchase_date: new Date(),
                purchase_price: 600000,
            },
        ],
    });

    // สร้าง BankEmployee จำลอง
    const bankEmployees = await prisma.bankEmployee.createMany({
        data: [
            {
                bank_name: 'ABC Bank',
                employee_name: 'Bank Officer 1',
                phone: '0841111111',
                email: 'bankofficer1@example.com',
                position: 'Loan Officer',
            },
            {
                bank_name: 'XYZ Bank',
                employee_name: 'Bank Officer 2',
                phone: '0842222222',
                email: 'bankofficer2@example.com',
                position: 'Credit Analyst',
            },
        ],
    });

    // สร้าง TaxInvoice จำลอง
    const taxInvoices = await prisma.taxInvoice.createMany({
        data: [
            {
                car_id: 1,
                invoice_date: new Date(),
                customer_id: 'CUS001',
                sale_price_before_vat: 450000,
                vat_7_percent: 35000,
                sale_price_incl_vat: 485000,
                invoice_type: 'Sale',
            },
            {
                car_id: 2,
                invoice_date: new Date(),
                customer_id: 'CUS002',
                sale_price_before_vat: 550000,
                vat_7_percent: 38500,
                sale_price_incl_vat: 588500,
                invoice_type: 'Sale',
            },
        ],
    });

    // สร้าง PurchaseTaxInvoice จำลอง
    const purchaseTaxInvoices = await prisma.purchaseTaxInvoice.createMany({
        data: [
            {
                car_id: 1,
                invoice_date: new Date(),
                invoice_number: 'INV001',
                supplier_id: 1,
                product_value_before_vat: 450000,
                vat_7_percent: 31500,
                product_value_incl_operations: 481500,
                no_vat: false,
            },
            {
                car_id: 2,
                invoice_date: new Date(),
                invoice_number: 'INV002',
                supplier_id: 2,
                product_value_before_vat: 550000,
                vat_7_percent: 38500,
                product_value_incl_operations: 588500,
                no_vat: false,
            },
        ],
    });

    console.log('Mockup data has been inserted successfully!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
