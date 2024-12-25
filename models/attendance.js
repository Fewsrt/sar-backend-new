// models/attendance.js
const prisma = require('../config/db');

// Get list of attendance records
const getAttendanceRecords = async () => {
    return await prisma.attendance.findMany({
        include: {
            employee: true,
        },
    });
};

// Get attendance record by ID
const getAttendanceById = async (attendanceId) => {
    return await prisma.attendance.findUnique({
        where: { attendance_id: parseInt(attendanceId) },
        include: {
            employee: true,
        },
    });
};

// Get attendance records by employee code
const getAttendanceRecordsByEmployeeCode = async (employeeCode) => {
    return await prisma.attendance.findMany({
        where: { employee_code: employeeCode },
        include: {
            employee: true,
        },
    });
};

// Create a new attendance record
const createAttendance = async ({ employee_code, check_in_time, check_in_latitude, check_in_longitude, status, note }) => {
    return await prisma.attendance.create({
        data: {
            employee_code,
            check_in_time,
            check_in_latitude,
            check_in_longitude,
            status,
            note,
        },
    });
};

// Update attendance record by ID
const updateAttendance = async (attendanceId, { check_out_time, check_out_latitude, check_out_longitude, status, note }) => {
    return await prisma.attendance.update({
        where: { attendance_id: parseInt(attendanceId) },
        data: {
            check_out_time,
            check_out_latitude,
            check_out_longitude,
            status,
            note,
        },
    });
};

// Delete attendance record by ID
const deleteAttendance = async (attendanceId) => {
    return await prisma.attendance.delete({
        where: { attendance_id: parseInt(attendanceId) },
    });
};

// Get latest attendance record by employee code
const getLatestAttendanceByEmployeeCode = async (employeeCode) => {
    return await prisma.attendance.findFirst({
        where: { 
            employee_code: employeeCode 
        },
        orderBy: {
            check_in_time: 'desc'
        },
        include: {
            employee: true
        }
    });
};

module.exports = {
    getAttendanceRecords,
    getAttendanceById,
    getAttendanceRecordsByEmployeeCode,
    createAttendance,
    updateAttendance,
    deleteAttendance,
    getLatestAttendanceByEmployeeCode,
};
