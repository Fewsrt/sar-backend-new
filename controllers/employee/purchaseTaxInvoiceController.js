const purchaseTaxInvoiceModel = require('../../models/purchaseTaxInvoice');

// Get all purchase tax invoices
const getAllPurchaseTaxInvoices = async (req, res) => {
    try {
        const invoices = await purchaseTaxInvoiceModel.getAllPurchaseTaxInvoices();
        res.json(invoices);
    } catch (error) {
        console.error('Error in getAllPurchaseTaxInvoices:', error);
        res.status(500).json({ error: 'Unable to fetch purchase tax invoices' });
    }
};

// Get purchase tax invoice by ID
const getPurchaseTaxInvoiceById = async (req, res) => {
    const { purchaseInvoiceId } = req.params;
    try {
        const invoice = await purchaseTaxInvoiceModel.getPurchaseTaxInvoiceById(purchaseInvoiceId);
        if (!invoice) {
            return res.status(404).json({ error: 'Purchase tax invoice not found' });
        }
        res.json(invoice);
    } catch (error) {
        console.error('Error in getPurchaseTaxInvoiceById:', error);
        res.status(500).json({ error: 'Unable to fetch purchase tax invoice' });
    }
};

// Get purchase tax invoice by invoice number
const getPurchaseTaxInvoiceByNumber = async (req, res) => {
    const { invoiceNumber } = req.params;
    try {
        const invoice = await purchaseTaxInvoiceModel.getPurchaseTaxInvoiceByNumber(invoiceNumber);
        if (!invoice) {
            return res.status(404).json({ error: 'Purchase tax invoice not found' });
        }
        res.json(invoice);
    } catch (error) {
        console.error('Error in getPurchaseTaxInvoiceByNumber:', error);
        res.status(500).json({ error: 'Unable to fetch purchase tax invoice' });
    }
};

// Get purchase tax invoices by supplier ID
const getPurchaseTaxInvoicesBySupplierId = async (req, res) => {
    const { supplierId } = req.params;
    try {
        const invoices = await purchaseTaxInvoiceModel.getPurchaseTaxInvoicesBySupplierId(supplierId);
        if (!invoices || invoices.length === 0) {
            return res.status(404).json({ error: 'No purchase tax invoices found for this supplier' });
        }
        res.json(invoices);
    } catch (error) {
        console.error('Error in getPurchaseTaxInvoicesBySupplierId:', error);
        res.status(500).json({ error: 'Unable to fetch supplier purchase tax invoices' });
    }
};

// Get purchase tax invoices by car ID
const getPurchaseTaxInvoicesByCarId = async (req, res) => {
    const { carId } = req.params;
    try {
        const invoices = await purchaseTaxInvoiceModel.getPurchaseTaxInvoicesByCarId(carId);
        if (!invoices || invoices.length === 0) {
            return res.status(404).json({ error: 'No purchase tax invoices found for this car' });
        }
        res.json(invoices);
    } catch (error) {
        console.error('Error in getPurchaseTaxInvoicesByCarId:', error);
        res.status(500).json({ error: 'Unable to fetch car purchase tax invoices' });
    }
};

// Create purchase tax invoice
const createPurchaseTaxInvoice = async (req, res) => {
    const {
        car_id,
        invoice_date,
        invoice_number,
        supplier_id,
        product_value_before_vat,
        vat_7_percent,
        product_value_incl_operations,
        no_vat
    } = req.body;

    try {
        const newInvoice = await purchaseTaxInvoiceModel.createPurchaseTaxInvoice({
            car_id,
            invoice_date,
            invoice_number,
            supplier_id,
            product_value_before_vat,
            vat_7_percent,
            product_value_incl_operations,
            no_vat
        });
        res.status(201).json(newInvoice);
    } catch (error) {
        if (error.code === 'P2002') {
            return res.status(400).json({ error: 'Invoice number already exists' });
        }
        console.error('Error in createPurchaseTaxInvoice:', error);
        res.status(500).json({ error: 'Unable to create purchase tax invoice' });
    }
};

// Update purchase tax invoice
const updatePurchaseTaxInvoice = async (req, res) => {
    const { purchaseInvoiceId } = req.params;
    const {
        invoice_date,
        invoice_number,
        product_value_before_vat,
        vat_7_percent,
        product_value_incl_operations,
        no_vat
    } = req.body;

    try {
        const updatedInvoice = await purchaseTaxInvoiceModel.updatePurchaseTaxInvoice(
            purchaseInvoiceId,
            {
                invoice_date,
                invoice_number,
                product_value_before_vat,
                vat_7_percent,
                product_value_incl_operations,
                no_vat
            }
        );
        res.json(updatedInvoice);
    } catch (error) {
        if (error.code === 'P2002') {
            return res.status(400).json({ error: 'Invoice number already exists' });
        }
        console.error('Error in updatePurchaseTaxInvoice:', error);
        res.status(500).json({ error: 'Unable to update purchase tax invoice' });
    }
};

// Delete purchase tax invoice
const deletePurchaseTaxInvoice = async (req, res) => {
    const { purchaseInvoiceId } = req.params;
    try {
        await purchaseTaxInvoiceModel.deletePurchaseTaxInvoice(purchaseInvoiceId);
        res.json({ message: 'Purchase tax invoice deleted successfully' });
    } catch (error) {
        console.error('Error in deletePurchaseTaxInvoice:', error);
        res.status(500).json({ error: 'Unable to delete purchase tax invoice' });
    }
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