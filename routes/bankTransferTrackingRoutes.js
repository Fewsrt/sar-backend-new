const express = require('express');
const {
    getAllTransferTrackings,
    getTransferTrackingById,
    getTransferTrackingsByCarId,
    getTransferTrackingsByBankEmployeeId,
    createTransferTracking,
    updateTransferTracking,
    deleteTransferTracking
} = require('../controllers/employee/bankTransferTrackingController');
const authenticateToken = require('../middleware/authenticateToken');

const router = express.Router();

// Protect all routes with authentication
router.use(authenticateToken);

// Get all transfer trackings
router.get('/', getAllTransferTrackings);

// Get transfer trackings by car ID
router.get('/car/:carId', getTransferTrackingsByCarId);

// Get transfer trackings by bank employee ID
router.get('/bank-employee/:bankEmployeeId', getTransferTrackingsByBankEmployeeId);

// Get transfer tracking by ID
router.get('/:trackingId', getTransferTrackingById);

// Create new transfer tracking
router.post('/', createTransferTracking);

// Update transfer tracking
router.patch('/:trackingId', updateTransferTracking);

// Delete transfer tracking
router.delete('/:trackingId', deleteTransferTracking);

module.exports = router; 