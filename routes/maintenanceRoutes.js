const express = require('express');
const { 
    getAllMaintenance, 
    getMaintenanceById, 
    getMaintenanceByCarId,
    createMaintenance, 
    updateMaintenance, 
    deleteMaintenance 
} = require('../controllers/employee/maintenanceController');
const authenticateToken = require('../middleware/authenticateToken');

const router = express.Router();

// Get all maintenance records
router.get('/', authenticateToken, getAllMaintenance);

// Get maintenance records by car ID
router.get('/car/:carId', authenticateToken, getMaintenanceByCarId);

// Get maintenance record by ID
router.get('/:maintenanceId', authenticateToken, getMaintenanceById);

// Create new maintenance record
router.post('/', authenticateToken, createMaintenance);

// Update maintenance record
router.patch('/:maintenanceId', authenticateToken, updateMaintenance);

// Delete maintenance record
router.delete('/:maintenanceId', authenticateToken, deleteMaintenance);

module.exports = router; 