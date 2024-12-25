const express = require('express');
const {
    getAllWithholdingTaxInvoices,
    getWithholdingTaxInvoiceById,
    getWithholdingTaxInvoiceByNumber,
    getWithholdingTaxInvoicesByCarId,
    createWithholdingTaxInvoice,
    updateWithholdingTaxInvoice,
    deleteWithholdingTaxInvoice
} = require('../controllers/employee/withholdingTaxInvoiceController');
const authenticateToken = require('../middleware/authenticateToken');

const router = express.Router();

// Protect all routes with authentication
router.use(authenticateToken);

// Get all withholding tax invoices
router.get('/', getAllWithholdingTaxInvoices);

// Get withholding tax invoice by invoice number
router.get('/number/:invoiceNumber', getWithholdingTaxInvoiceByNumber);

// Get withholding tax invoices by car ID
router.get('/car/:carId', getWithholdingTaxInvoicesByCarId);

// Get withholding tax invoice by ID
router.get('/:withholdingInvoiceId', getWithholdingTaxInvoiceById);

// Create new withholding tax invoice
router.post('/', createWithholdingTaxInvoice);

// Update withholding tax invoice
router.patch('/:withholdingInvoiceId', updateWithholdingTaxInvoice);

// Delete withholding tax invoice
router.delete('/:withholdingInvoiceId', deleteWithholdingTaxInvoice);

module.exports = router; 