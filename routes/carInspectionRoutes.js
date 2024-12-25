const express = require('express');
const {
    getAllInspections,
    getInspectionById,
    getInspectionsByCarId,
    createInspection,
    updateInspection,
    deleteInspection
} = require('../controllers/employee/carInspectionController');
const authenticateToken = require('../middleware/authenticateToken');

const router = express.Router();

// Get all inspections
router.get('/', authenticateToken, getAllInspections);

// Get inspections by car ID
router.get('/car/:carId', authenticateToken, getInspectionsByCarId);

// Get inspection by ID
router.get('/:inspectionId', authenticateToken, getInspectionById);

// Create new inspection
router.post('/', authenticateToken, createInspection);

// Update inspection
router.patch('/:inspectionId', authenticateToken, updateInspection);

// Delete inspection
router.delete('/:inspectionId', authenticateToken, deleteInspection);

module.exports = router; 