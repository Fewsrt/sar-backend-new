// routes/attendanceRoutes.js
const express = require('express');
const { getAttendanceRecords, getAttendanceById, getAttendanceByEmployeeCode, createAttendance, updateAttendanceByEmployeeCode, deleteAttendance, getLatestAttendance } = require('../controllers/employee/attendanceController');
const authenticateToken = require('../middleware/authenticateToken');

const router = express.Router();

// เส้นทางสำหรับจัดการข้อมูลการเข้างาน

// Get list of attendance records
router.get('/', authenticateToken, getAttendanceRecords);

// Get attendance records by employee code
router.get('/employee-code/:employeeCode', authenticateToken, getAttendanceByEmployeeCode);

// Get attendance record by ID
router.get('/:attendanceId', authenticateToken, getAttendanceById);

// Create a new attendance record
router.post('/', authenticateToken, createAttendance);

// Update attendance record by ID
router.patch('/:attendanceId', authenticateToken, updateAttendanceByEmployeeCode);

// Delete attendance record by ID
router.delete('/:attendanceId', authenticateToken, deleteAttendance);

// Get latest attendance record by employee code
router.get('/latest/:employee_code', authenticateToken, getLatestAttendance);

module.exports = router;
