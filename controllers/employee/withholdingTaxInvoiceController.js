const withholdingTaxInvoiceModel = require('../../models/withholdingTaxInvoice');

// Get all withholding tax invoices
const getAllWithholdingTaxInvoices = async (req, res) => {
    try {
        const invoices = await withholdingTaxInvoiceModel.getAllWithholdingTaxInvoices();
        res.json(invoices);
    } catch (error) {
        console.error('Error in getAllWithholdingTaxInvoices:', error);
        res.status(500).json({ error: 'Unable to fetch withholding tax invoices' });
    }
};

// Get withholding tax invoice by ID
const getWithholdingTaxInvoiceById = async (req, res) => {
    const { withholdingInvoiceId } = req.params;
    try {
        const invoice = await withholdingTaxInvoiceModel.getWithholdingTaxInvoiceById(withholdingInvoiceId);
        if (!invoice) {
            return res.status(404).json({ error: 'Withholding tax invoice not found' });
        }
        res.json(invoice);
    } catch (error) {
        console.error('Error in getWithholdingTaxInvoiceById:', error);
        res.status(500).json({ error: 'Unable to fetch withholding tax invoice' });
    }
};

// Get withholding tax invoice by invoice number
const getWithholdingTaxInvoiceByNumber = async (req, res) => {
    const { invoiceNumber } = req.params;
    try {
        const invoice = await withholdingTaxInvoiceModel.getWithholdingTaxInvoiceByNumber(invoiceNumber);
        if (!invoice) {
            return res.status(404).json({ error: 'Withholding tax invoice not found' });
        }
        res.json(invoice);
    } catch (error) {
        console.error('Error in getWithholdingTaxInvoiceByNumber:', error);
        res.status(500).json({ error: 'Unable to fetch withholding tax invoice' });
    }
};

// Get withholding tax invoices by car ID
const getWithholdingTaxInvoicesByCarId = async (req, res) => {
    const { carId } = req.params;
    try {
        const invoices = await withholdingTaxInvoiceModel.getWithholdingTaxInvoicesByCarId(carId);
        if (!invoices || invoices.length === 0) {
            return res.status(404).json({ error: 'No withholding tax invoices found for this car' });
        }
        res.json(invoices);
    } catch (error) {
        console.error('Error in getWithholdingTaxInvoicesByCarId:', error);
        res.status(500).json({ error: 'Unable to fetch car withholding tax invoices' });
    }
};

// Create withholding tax invoice
const createWithholdingTaxInvoice = async (req, res) => {
    const {
        car_id,
        invoice_date,
        invoice_number,
        vat_3_percent
    } = req.body;

    try {
        const newInvoice = await withholdingTaxInvoiceModel.createWithholdingTaxInvoice({
            car_id,
            invoice_date,
            invoice_number,
            vat_3_percent
        });
        res.status(201).json(newInvoice);
    } catch (error) {
        if (error.code === 'P2002') {
            return res.status(400).json({ error: 'Invoice number already exists' });
        }
        console.error('Error in createWithholdingTaxInvoice:', error);
        res.status(500).json({ error: 'Unable to create withholding tax invoice' });
    }
};

// Update withholding tax invoice
const updateWithholdingTaxInvoice = async (req, res) => {
    const { withholdingInvoiceId } = req.params;
    const {
        invoice_date,
        invoice_number,
        vat_3_percent
    } = req.body;

    try {
        const updatedInvoice = await withholdingTaxInvoiceModel.updateWithholdingTaxInvoice(
            withholdingInvoiceId,
            {
                invoice_date,
                invoice_number,
                vat_3_percent
            }
        );
        res.json(updatedInvoice);
    } catch (error) {
        if (error.code === 'P2002') {
            return res.status(400).json({ error: 'Invoice number already exists' });
        }
        console.error('Error in updateWithholdingTaxInvoice:', error);
        res.status(500).json({ error: 'Unable to update withholding tax invoice' });
    }
};

// Delete withholding tax invoice
const deleteWithholdingTaxInvoice = async (req, res) => {
    const { withholdingInvoiceId } = req.params;
    try {
        await withholdingTaxInvoiceModel.deleteWithholdingTaxInvoice(withholdingInvoiceId);
        res.json({ message: 'Withholding tax invoice deleted successfully' });
    } catch (error) {
        console.error('Error in deleteWithholdingTaxInvoice:', error);
        res.status(500).json({ error: 'Unable to delete withholding tax invoice' });
    }
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