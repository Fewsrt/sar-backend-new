// routes/supplierRoutes.js
const express = require('express');
const { getSuppliers, getSupplierById, createSupplier, updateSupplier, deleteSupplier } = require('../controllers/employee/supplierController');
const authenticateToken = require('../middleware/authenticateToken');

const router = express.Router();

// เส้นทางสำหรับจัดการข้อมูล supplier

// Get list of suppliers
router.get('/', authenticateToken, getSuppliers);

// Get supplier by ID
router.get('/:supplierId', authenticateToken, getSupplierById);

// Create a new supplier
router.post('/', authenticateToken, createSupplier);

// Update supplier by ID
router.patch('/:supplierId', authenticateToken, updateSupplier);

// Delete supplier by ID
router.delete('/:supplierId', authenticateToken, deleteSupplier);

module.exports = router;
