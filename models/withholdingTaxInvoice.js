const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all withholding tax invoices
const getAllWithholdingTaxInvoices = async () => {
    return await prisma.withholdingTaxInvoice.findMany({
        include: {
            car: true,
        },
    });
};

// Get withholding tax invoice by ID
const getWithholdingTaxInvoiceById = async (withholdingInvoiceId) => {
    return await prisma.withholdingTaxInvoice.findUnique({
        where: { withholding_invoice_id: parseInt(withholdingInvoiceId) },
        include: {
            car: true,
        },
    });
};

// Get withholding tax invoice by invoice number
const getWithholdingTaxInvoiceByNumber = async (invoiceNumber) => {
    return await prisma.withholdingTaxInvoice.findUnique({
        where: { invoice_number: invoiceNumber },
        include: {
            car: true,
        },
    });
};

// Get withholding tax invoices by car ID
const getWithholdingTaxInvoicesByCarId = async (carId) => {
    return await prisma.withholdingTaxInvoice.findMany({
        where: { car_id: parseInt(carId) },
        include: {
            car: true,
        },
    });
};

// Create withholding tax invoice
const createWithholdingTaxInvoice = async ({
    car_id,
    invoice_date,
    invoice_number,
    vat_3_percent
}) => {
    return await prisma.withholdingTaxInvoice.create({
        data: {
            car_id: parseInt(car_id),
            invoice_date: new Date(invoice_date),
            invoice_number,
            vat_3_percent: vat_3_percent ? parseFloat(vat_3_percent) : null
        },
        include: {
            car: true,
        },
    });
};

// Update withholding tax invoice
const updateWithholdingTaxInvoice = async (withholdingInvoiceId, {
    invoice_date,
    invoice_number,
    vat_3_percent
}) => {
    return await prisma.withholdingTaxInvoice.update({
        where: { withholding_invoice_id: parseInt(withholdingInvoiceId) },
        data: {
            invoice_date: invoice_date ? new Date(invoice_date) : undefined,
            invoice_number,
            vat_3_percent: vat_3_percent ? parseFloat(vat_3_percent) : undefined
        },
        include: {
            car: true,
        },
    });
};

// Delete withholding tax invoice
const deleteWithholdingTaxInvoice = async (withholdingInvoiceId) => {
    return await prisma.withholdingTaxInvoice.delete({
        where: { withholding_invoice_id: parseInt(withholdingInvoiceId) },
    });
};

module.exports = {
    getAllWithholdingTaxInvoices,
    getWithholdingTaxInvoiceById,
    getWithholdingTaxInvoiceByNumber,
    getWithholdingTaxInvoicesByCarId,
    createWithholdingTaxInvoice,
    updateWithholdingTaxInvoice,
    deleteWithholdingTaxInvoice,
}; 