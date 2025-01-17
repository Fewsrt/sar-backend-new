const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Function to generate invoice number: PV-YYMM-XXXX
async function generateInvoiceNumber() {
    const today = new Date();
    const year = today.getFullYear().toString().slice(-2);
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const prefix = `PV-${year}${month}-`;

    // Find latest invoice number for current month
    const latestInvoice = await prisma.purchaseTaxInvoice.findFirst({
        where: {
            invoice_number: {
                startsWith: prefix
            }
        },
        orderBy: {
            invoice_number: 'desc'
        }
    });

    let nextNumber = 1;
    if (latestInvoice) {
        const currentNumber = parseInt(latestInvoice.invoice_number.split('-')[2]);
        nextNumber = currentNumber + 1;
    }

    return `${prefix}${nextNumber.toString().padStart(4, '0')}`;
}

// Get all purchase tax invoices
const getAllPurchaseTaxInvoices = async () => {
    return await prisma.purchaseTaxInvoice.findMany({
        include: {
            car: true,
            supplier: true,
        },
    });
};

// Get purchase tax invoice by ID
const getPurchaseTaxInvoiceById = async (purchaseInvoiceId) => {
    return await prisma.purchaseTaxInvoice.findUnique({
        where: { purchase_invoice_id: parseInt(purchaseInvoiceId) },
        include: {
            car: true,
            supplier: true,
        },
    });
};

// Get purchase tax invoice by invoice number
const getPurchaseTaxInvoiceByNumber = async (invoiceNumber) => {
    return await prisma.purchaseTaxInvoice.findUnique({
        where: { invoice_number: invoiceNumber },
        include: {
            car: true,
            supplier: true,
        },
    });
};

// Get purchase tax invoices by supplier ID
const getPurchaseTaxInvoicesBySupplierId = async (supplierId) => {
    return await prisma.purchaseTaxInvoice.findMany({
        where: { supplier_id: parseInt(supplierId) },
        include: {
            car: true,
            supplier: true,
        },
    });
};

// Get purchase tax invoices by car ID
const getPurchaseTaxInvoicesByCarId = async (carId) => {
    return await prisma.purchaseTaxInvoice.findMany({
        where: { car_id: parseInt(carId) },
        include: {
            car: true,
            supplier: true,
        },
    });
};

// Create purchase tax invoice with auto-generated invoice number
const createPurchaseTaxInvoice = async ({
    invoice_date,
    supplier_id,
    product_value_before_vat,
    vat_7_percent,
    product_value_incl_operations,
    no_vat
}) => {
    // Generate invoice number
    const invoice_number = await generateInvoiceNumber();

    return await prisma.purchaseTaxInvoice.create({
        data: {
            invoice_date: new Date(invoice_date),
            invoice_number, // Auto-generated
            supplier_id: parseInt(supplier_id),
            product_value_before_vat: product_value_before_vat ? parseFloat(product_value_before_vat) : null,
            vat_7_percent: vat_7_percent ? parseFloat(vat_7_percent) : null,
            product_value_incl_operations: product_value_incl_operations ? parseFloat(product_value_incl_operations) : null,
            no_vat: Boolean(no_vat)
        },
        include: {
            carTaxDetails: true,
            supplier: true,
        },
    });
};

// Update purchase tax invoice
const updatePurchaseTaxInvoice = async (purchaseInvoiceId, {
    invoice_date,
    invoice_number,
    product_value_before_vat,
    vat_7_percent,
    product_value_incl_operations,
    no_vat
}) => {
    return await prisma.purchaseTaxInvoice.update({
        where: { purchase_invoice_id: parseInt(purchaseInvoiceId) },
        data: {
            invoice_date: invoice_date ? new Date(invoice_date) : undefined,
            invoice_number,
            product_value_before_vat: product_value_before_vat ? parseFloat(product_value_before_vat) : undefined,
            vat_7_percent: vat_7_percent ? parseFloat(vat_7_percent) : undefined,
            product_value_incl_operations: product_value_incl_operations ? parseFloat(product_value_incl_operations) : undefined,
            no_vat: no_vat !== undefined ? Boolean(no_vat) : undefined
        },
        include: {
            carTaxDetails: true,
            supplier: true,
        },
    });
};

// Delete purchase tax invoice
const deletePurchaseTaxInvoice = async (purchaseInvoiceId) => {
    return await prisma.purchaseTaxInvoice.delete({
        where: { purchase_invoice_id: parseInt(purchaseInvoiceId) },
    });
};

module.exports = {
    getAllPurchaseTaxInvoices,
    getPurchaseTaxInvoiceById,
    getPurchaseTaxInvoiceByNumber,
    getPurchaseTaxInvoicesBySupplierId,
    getPurchaseTaxInvoicesByCarId,
    createPurchaseTaxInvoice,
    updatePurchaseTaxInvoice,
    deletePurchaseTaxInvoice,
}; 