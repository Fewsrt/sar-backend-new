const express = require('express');
const {
    getAllTaxInvoices,
    getTaxInvoiceById,
    getTaxInvoicesByCustomerId,
    getTaxInvoicesByCarId,
    createTaxInvoice,
    updateTaxInvoice,
    deleteTaxInvoice
} = require('../controllers/employee/taxInvoiceController');
const authenticateToken = require('../middleware/authenticateToken');

const router = express.Router();

// Protect all routes with authentication
router.use(authenticateToken);

// Get all tax invoices
router.get('/', getAllTaxInvoices);

// Get tax invoices by customer ID
router.get('/customer/:customerId', getTaxInvoicesByCustomerId);

// Get tax invoices by car ID
router.get('/car/:carId', getTaxInvoicesByCarId);

// Get tax invoice by ID
router.get('/:invoiceId', getTaxInvoiceById);

// Create new tax invoice
router.post('/', createTaxInvoice);

// Update tax invoice
router.patch('/:invoiceId', updateTaxInvoice);

// Delete tax invoice
router.delete('/:invoiceId', deleteTaxInvoice);

module.exports = router; 