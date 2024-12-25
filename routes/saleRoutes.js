const express = require('express');
const {
    getAllSales,
    getSaleById,
    getSalesByCustomerId,
    getSalesBySalespersonId,
    getSalesByBranchId,
    createSale,
    updateSale,
    deleteSale
} = require('../controllers/employee/saleController');
const authenticateToken = require('../middleware/authenticateToken');

const router = express.Router();

// Protect all routes with authentication
router.use(authenticateToken);

// Get all sales
router.get('/', getAllSales);

// Get sales by customer ID
router.get('/customer/:customerId', getSalesByCustomerId);

// Get sales by salesperson ID
router.get('/salesperson/:salespersonId', getSalesBySalespersonId);

// Get sales by branch ID
router.get('/branch/:branchId', getSalesByBranchId);

// Get sale by ID
router.get('/:saleId', getSaleById);

// Create new sale
router.post('/', createSale);

// Update sale
router.patch('/:saleId', updateSale);

// Delete sale
router.delete('/:saleId', deleteSale);

module.exports = router; 