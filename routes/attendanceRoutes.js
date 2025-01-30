const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/employee/attendanceController');
const authenticateToken = require('../middleware/authenticateToken');
const authorizeRoles = require('../middleware/roleMiddleware');

// Get monthly attendance summary
router.get('/summary', 
    authenticateToken, 
    attendanceController.getMonthlyAttendanceSummary
);

// Get attendance records with date range
router.get('/employee-code/:employeeCode', 
    authenticateToken, 
    attendanceController.getAttendanceByEmployeeCode
);

// Get list of all attendance records (HR/Admin only)
router.get('/', 
    authenticateToken, 
    authorizeRoles('admin', 'hr'),
    attendanceController.getAttendanceRecords
);

// Create new attendance record
router.post('/', 
    authenticateToken, 
    attendanceController.createAttendance
);

// Update attendance record
router.patch('/:attendanceId', 
    authenticateToken, 
    attendanceController.updateAttendanceByEmployeeCode
);

// Delete attendance record (HR/Admin only)
router.delete('/:attendanceId', 
    authenticateToken, 
    authorizeRoles('admin', 'hr'),
    attendanceController.deleteAttendance
);

// Get latest attendance record
router.get('/latest/:employee_code', 
    authenticateToken, 
    attendanceController.getLatestAttendance
);

module.exports = router;