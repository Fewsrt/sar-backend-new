const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

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

// Create tax invoice
const createTaxInvoice = async ({
    car_id,
    invoice_date,
    customer_id,
    sale_price_before_vat,
    vat_7_percent,
    sale_price_incl_vat,
    invoice_type
}) => {
    return await prisma.taxInvoice.create({
        data: {
            car_id: parseInt(car_id),
            invoice_date: new Date(invoice_date),
            customer_id: parseInt(customer_id),
            sale_price_before_vat: sale_price_before_vat ? parseFloat(sale_price_before_vat) : null,
            vat_7_percent: vat_7_percent ? parseFloat(vat_7_percent) : null,
            sale_price_incl_vat: sale_price_incl_vat ? parseFloat(sale_price_incl_vat) : null,
            invoice_type
        },
        include: {
            car: true,
            customer: true,
        },
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

module.exports = {
    getAllTaxInvoices,
    getTaxInvoiceById,
    getTaxInvoicesByCustomerId,
    getTaxInvoicesByCarId,
    createTaxInvoice,
    updateTaxInvoice,
    deleteTaxInvoice,
}; 