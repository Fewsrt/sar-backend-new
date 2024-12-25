const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

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

// Create purchase tax invoice
const createPurchaseTaxInvoice = async ({
    car_id,
    invoice_date,
    invoice_number,
    supplier_id,
    product_value_before_vat,
    vat_7_percent,
    product_value_incl_operations,
    no_vat
}) => {
    return await prisma.purchaseTaxInvoice.create({
        data: {
            car_id: parseInt(car_id),
            invoice_date: new Date(invoice_date),
            invoice_number,
            supplier_id: parseInt(supplier_id),
            product_value_before_vat: product_value_before_vat ? parseFloat(product_value_before_vat) : null,
            vat_7_percent: vat_7_percent ? parseFloat(vat_7_percent) : null,
            product_value_incl_operations: product_value_incl_operations ? parseFloat(product_value_incl_operations) : null,
            no_vat: Boolean(no_vat)
        },
        include: {
            car: true,
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
            car: true,
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