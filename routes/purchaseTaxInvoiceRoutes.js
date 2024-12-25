const express = require('express');
const {
    getAllPurchaseTaxInvoices,
    getPurchaseTaxInvoiceById,
    getPurchaseTaxInvoiceByNumber,
    getPurchaseTaxInvoicesBySupplierId,
    getPurchaseTaxInvoicesByCarId,
    createPurchaseTaxInvoice,
    updatePurchaseTaxInvoice,
    deletePurchaseTaxInvoice
} = require('../controllers/employee/purchaseTaxInvoiceController');
const authenticateToken = require('../middleware/authenticateToken');

const router = express.Router();

// Protect all routes with authentication
router.use(authenticateToken);

// Get all purchase tax invoices
router.get('/', getAllPurchaseTaxInvoices);

// Get purchase tax invoice by invoice number
router.get('/number/:invoiceNumber', getPurchaseTaxInvoiceByNumber);

// Get purchase tax invoices by supplier ID
router.get('/supplier/:supplierId', getPurchaseTaxInvoicesBySupplierId);

// Get purchase tax invoices by car ID
router.get('/car/:carId', getPurchaseTaxInvoicesByCarId);

// Get purchase tax invoice by ID
router.get('/:purchaseInvoiceId', getPurchaseTaxInvoiceById);

// Create new purchase tax invoice
router.post('/', createPurchaseTaxInvoice);

// Update purchase tax invoice
router.patch('/:purchaseInvoiceId', updatePurchaseTaxInvoice);

// Delete purchase tax invoice
router.delete('/:purchaseInvoiceId', deletePurchaseTaxInvoice);

module.exports = router; 