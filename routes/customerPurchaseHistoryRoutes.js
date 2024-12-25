const express = require('express');
const {
    getAllPurchaseHistories,
    getPurchaseHistoryById,
    getPurchaseHistoriesByCustomerId,
    getPurchaseHistoriesByCarId,
    createPurchaseHistory,
    updatePurchaseHistory,
    deletePurchaseHistory
} = require('../controllers/employee/customerPurchaseHistoryController');
const authenticateToken = require('../middleware/authenticateToken');

const router = express.Router();

// Protect all routes with authentication
router.use(authenticateToken);

// Get all purchase histories
router.get('/', getAllPurchaseHistories);

// Get purchase histories by customer ID
router.get('/customer/:customerId', getPurchaseHistoriesByCustomerId);

// Get purchase histories by car ID
router.get('/car/:carId', getPurchaseHistoriesByCarId);

// Get purchase history by ID
router.get('/:historyId', getPurchaseHistoryById);

// Create new purchase history
router.post('/', createPurchaseHistory);

// Update purchase history
router.patch('/:historyId', updatePurchaseHistory);

// Delete purchase history
router.delete('/:historyId', deletePurchaseHistory);

module.exports = router; 