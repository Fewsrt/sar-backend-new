// controllers/attendanceController.js
const attendanceModel = require('../../models/attendance');

// Get list of attendance records
const getAttendanceRecords = async (req, res) => {
    try {
        const attendanceRecords = await attendanceModel.getAttendanceRecords();
        // แยก password ออกจากข้อมูลพนักงานใน attendanceRecords
        const filteredAttendanceRecords = attendanceRecords.map(record => {
            const { employee: { password, ...employeeData }, ...rest } = record;
            return { ...rest, employee: employeeData };
        });
        res.json(filteredAttendanceRecords);
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch attendance records' });
    }
};

// Get attendance record by ID
const getAttendanceById = async (req, res) => {
    const { attendanceId } = req.params;
    try {
        const attendanceRecord = await attendanceModel.getAttendanceById(attendanceId);
        if (!attendanceRecord) {
            res.status(404).json({ error: 'Attendance record not found' });
        } else {
            // แยก password ออกจากข้อมูลพนักงานใน attendanceRecord
            const { employee: { password, ...employeeData }, ...rest } = attendanceRecord;
            res.json({ ...rest, employee: employeeData });
        }
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch attendance record' });
    }
};

// Get attendance records by employee code
const getAttendanceByEmployeeCode = async (req, res) => {
    const { employeeCode } = req.params;
    try {
        const attendanceRecords = await attendanceModel.getAttendanceRecordsByEmployeeCode(employeeCode);
        if (!attendanceRecords || attendanceRecords.length === 0) {
            res.status(404).json({ error: 'No attendance records found for this employee' });
        } else {
            // แยก password ออกจากข้อมูลพนักงานใน attendanceRecords
            const filteredAttendanceRecords = attendanceRecords.map(record => {
                const { employee: { password, ...employeeData }, ...rest } = record;
                return { ...rest, employee: employeeData };
            });
            res.json(filteredAttendanceRecords);
        }
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch attendance records for employee' });
    }
};

// Create a new attendance record
const createAttendance = async (req, res) => {
    const { check_in_time, check_in_latitude, check_in_longitude, status, note } = req.body;
    // ดึง employee_code จาก token หรือ req.user (สมมุติว่ามี middleware ที่ทำการตรวจสอบ token แล้วใส่ employee_code ลงใน req.user)
    const employee_code = req.user.employee_code;
    try {
        const newAttendance = await attendanceModel.createAttendance({
            employee_code,
            check_in_time,
            check_in_latitude,
            check_in_longitude,
            status,
            note,
        });
        res.status(201).json(newAttendance);
    } catch (error) {
        res.status(500).json({ error: 'Unable to create attendance record' });
    }
};

// Update attendance record by employee code
const updateAttendanceByEmployeeCode = async (req, res) => {
    const { attendanceId } = req.params;
    const { check_out_time, check_out_latitude, check_out_longitude, status, note } = req.body;
    const employee_code = req.user.employee_code; // ดึง employee_code จาก token หรือ req.user
    try {
        // ตรวจสอบว่า attendance นั้นเป็นของพนักงานคนที่กำลังเข้ามาอัปเดตหรือไม่
        const attendanceRecord = await attendanceModel.getAttendanceById(attendanceId);
        if (!attendanceRecord || attendanceRecord.employee_code !== employee_code) {
            return res.status(403).json({ error: 'You are not authorized to update this attendance record' });
        }
        const updatedAttendance = await attendanceModel.updateAttendance(attendanceId, {
            check_out_time,
            check_out_latitude,
            check_out_longitude,
            status,
            note,
        });
        res.json(updatedAttendance);
    } catch (error) {
        res.status(500).json({ error: 'Unable to update attendance record' });
    }
};


// Delete attendance record by ID
const deleteAttendance = async (req, res) => {
    const { attendanceId } = req.params;
    try {
        await attendanceModel.deleteAttendance(attendanceId);
        res.status(200).json({ message: 'Attendance record deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Unable to delete attendance record' });
    }
};

// Get latest attendance record by employee code
const getLatestAttendance = async (req, res) => {
    const { employee_code } = req.params;
    try {
        const attendance = await attendanceModel.getLatestAttendanceByEmployeeCode(employee_code);
        
        if (!attendance) {
            return res.status(404).json({ 
                error: 'No attendance records found for this employee' 
            });
        }

        // Remove password from employee data
        const { employee: { password, ...employeeData }, ...attendanceData } = attendance;
        
        res.json({
            ...attendanceData,
            employee: employeeData
        });
    } catch (error) {
        console.error('Error fetching latest attendance:', error);
        res.status(500).json({ 
            error: 'Unable to fetch latest attendance record' 
        });
    }
};

module.exports = {
    getAttendanceRecords,
    getAttendanceById,
    getAttendanceByEmployeeCode,
    createAttendance,
    updateAttendanceByEmployeeCode,
    deleteAttendance,
    getLatestAttendance,
};
