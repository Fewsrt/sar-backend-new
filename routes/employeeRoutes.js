// routes/employeeRoutes.js
const express = require('express');
const { getEmployees, getEmployeeById, createEmployee, updateEmployee, updatePassword, updateRole, deleteEmployee, getLastEmployeeNumber, resetPassword, resetLineUUID } = require('../controllers/employee/employeeController');
const authenticateToken = require('../middleware/authenticateToken');
const authorizeRoles = require('../middleware/roleMiddleware');

const router = express.Router();

// เส้นทางสำหรับจัดการข้อมูลพนักงาน

// Update password
router.patch('/update-password', updatePassword);

// Update role of employee
router.patch('/update-role', authenticateToken, updateRole);

// Get list of employees
router.get('/', authenticateToken, authorizeRoles('admin'), getEmployees);

router.get('/line/mapping', getEmployees);

// Create a new employee
router.post('/', authenticateToken, createEmployee);

// Get employee by ID
router.get('/:employeeId', authenticateToken, getEmployeeById);

// Update employee by ID
router.patch('/:employeeId', authenticateToken, updateEmployee);

router.patch('/line/:employeeId', updateEmployee);

// Delete employee by ID
router.delete('/:employeeId', authenticateToken, deleteEmployee);

// Get last employee number by prefix
router.get('/last-number/:prefix', authenticateToken, getLastEmployeeNumber);

// Reset password (admin only)
router.post(
    '/:employeeId/reset-password',
    authenticateToken,
    authorizeRoles('admin', 'hr'),
    resetPassword
);

// Reset LINE UUID (admin only)
router.post(
    '/:employeeId/reset-line',
    authenticateToken,
    authorizeRoles('admin', 'hr'),
    resetLineUUID
);

module.exports = router;
