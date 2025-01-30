const express = require('express');
const router = express.Router();
const leaveRequestController = require('../controllers/employee/leaveRequestController');
const authenticateToken = require('../middleware/authenticateToken');
const authorizeRoles = require('../middleware/roleMiddleware');

// Get all leave requests
router.get('/', authenticateToken, authorizeRoles('admin', 'hr'), leaveRequestController.getAllLeaveRequests);

// Get leave request by ID
router.get('/:id', authenticateToken, leaveRequestController.getLeaveRequestById);

// Get leave requests by employee ID
router.get('/employee/:employeeId', authenticateToken, leaveRequestController.getLeaveRequestsByEmployeeId);

// Create leave request
router.post('/', authenticateToken, leaveRequestController.createLeaveRequest);

// Update leave request
router.patch('/:id', authenticateToken, authorizeRoles('admin', 'hr'), leaveRequestController.updateLeaveRequest);

// Delete leave request
router.delete('/:id', authenticateToken, authorizeRoles('admin', 'hr'), leaveRequestController.deleteLeaveRequest);

module.exports = router;
