const express = require('express');
const router = express.Router();
const salaryController = require('../controllers/employee/salaryController');
const authenticateToken = require('../middleware/authenticateToken');
const authorizeRoles = require('../middleware/roleMiddleware');

// Get all salaries
router.get('/', authenticateToken, authorizeRoles('admin', 'hr'), salaryController.getAllSalaries);

// Get salary by ID
router.get('/:id', authenticateToken, salaryController.getSalaryById);

// Get salaries by employee ID
router.get('/employee/:employeeId', authenticateToken, salaryController.getSalariesByEmployeeId);

// Create salary
router.post('/', authenticateToken, authorizeRoles('admin', 'hr'), salaryController.createSalary);

// Update salary
router.patch('/:id', authenticateToken, authorizeRoles('admin', 'hr'), salaryController.updateSalary);

// Delete salary
router.delete('/:id', authenticateToken, authorizeRoles('admin', 'hr'), salaryController.deleteSalary);

module.exports = router;
