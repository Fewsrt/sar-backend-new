const express = require('express');
const { getCustomers, getCustomerById, createCustomer, updateCustomer, deleteCustomer, getCustomerCodesC, getNewCustomerCodeC } = require('../controllers/employee/customerController');
const authenticateToken = require('../middleware/authenticateToken');

const router = express.Router();

// เส้นทางสำหรับจัดการข้อมูล customer

// Get list of customers
router.get('/', authenticateToken, getCustomers);

// Get customer by ID
router.get('/:customerId', authenticateToken, getCustomerById);

// Create a new customer
router.post('/', authenticateToken, createCustomer);

// Update customer by ID
router.patch('/:customerId', authenticateToken, updateCustomer);

// Delete customer by ID
router.delete('/:customerId', authenticateToken, deleteCustomer);

// เพิ่มเส้นทางสำหรับสร้างรหัสลูกค้า C ใหม่
router.get('/customer-codes/new', authenticateToken, getNewCustomerCodeC);

module.exports = router; 