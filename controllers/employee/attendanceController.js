// controllers/attendanceController.js
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
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
    const { startDate, endDate } = req.query;
    
    try {
        const attendanceRecords = await attendanceModel.getAttendanceRecordsByEmployeeCode(
            employeeCode,
            startDate,
            endDate
        );
        
        if (!attendanceRecords || attendanceRecords.length === 0) {
            return res.status(404).json({ error: 'No attendance records found for this employee' });
        }

        const filteredAttendanceRecords = attendanceRecords.map(record => {
            const { employee: { password, ...employeeData }, ...rest } = record;
            return { ...rest, employee: employeeData };
        });
        
        res.json(filteredAttendanceRecords);
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch attendance records for employee' });
    }
};

// ฟังก์ชันสำหรับบันทึกรูปภาพ
const saveImage = async (base64Image, employee_code) => {
    try {
        // แยกส่วน header ของ base64 ออก
        const matches = base64Image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        if (!matches || matches.length !== 3) {
            throw new Error('Invalid base64 image string');
        }

        // สร้างชื่อไฟล์ที่ไม่ซ้ำกัน
        const fileType = matches[1].split('/')[1];
        const fileName = `${employee_code}_${uuidv4()}.${fileType}`;
        
        // สร้างโฟลเดอร์ถ้ายังไม่มี
        const uploadDir = path.join(__dirname, '../../uploads/attendance');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        // บันทึกไฟล์
        const filePath = path.join(uploadDir, fileName);
        fs.writeFileSync(filePath, matches[2], 'base64');

        // ส่งคืน path ของไฟล์ (เก็บเฉพาะ path ที่จะใช้เรียกผ่าน URL)
        return `uploads/attendance/${fileName}`;
    } catch (error) {
        console.error('Error saving image:', error);
        throw error;
    }
};

// Create a new attendance record
const createAttendance = async (req, res) => {
    const { 
        check_in_time, 
        check_in_latitude, 
        check_in_longitude, 
        status, 
        note,
        check_in_image
    } = req.body;
    
    const employee_code = req.user.employee_code;
    
    try {
        // บันทึกรูปภาพถ้ามี
        let image_path = null;
        if (check_in_image) {
            image_path = await saveImage(check_in_image, employee_code);
        }

        const newAttendance = await attendanceModel.createAttendance({
            employee_code,
            check_in_time,
            check_in_latitude,
            check_in_longitude,
            status,
            note,
            check_in_image: image_path
        });

        // ถ้ามีการหักเงิน ให้แสดงข้อมูลเพิ่มเติม
        const deductionInfo = newAttendance.deduction_amount > 0 
            ? {
                lateMinutes: newAttendance.late_minutes,
                deductionAmount: newAttendance.deduction_amount,
                isHalfDay: newAttendance.is_half_day_absent
            }
            : null;

        res.status(201).json({
            ...newAttendance,
            deductionInfo
        });
    } catch (error) {
        console.error('Error creating attendance record:', error);
        res.status(500).json({ 
            error: 'Unable to create attendance record',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
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

// Check out
const updateCheckOut = async (req, res) => {
    const { 
        attendance_id,
        check_out_time, 
        check_out_latitude, 
        check_out_longitude,
        check_out_image  // รับ base64 string ของรูปภาพ check out
    } = req.body;
    
    const employee_code = req.user.employee_code;

    try {
        // บันทึกรูปภาพ check out ถ้ามี
        let image_path = null;
        if (check_out_image) {
            image_path = await saveImage(check_out_image, employee_code);
        }

        const updatedAttendance = await attendanceModel.updateCheckOut(attendance_id, {
            check_out_time,
            check_out_latitude,
            check_out_longitude,
            check_out_image: image_path
        });

        res.json(updatedAttendance);
    } catch (error) {
        console.error('Error updating check-out:', error);
        res.status(500).json({ 
            error: 'Unable to update check-out',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Get monthly attendance summary with deductions
const getMonthlyAttendanceSummary = async (req, res) => {
    const { year, month } = req.query;
    const employee_code = req.user.employee_code;

    try {
        const summary = await attendanceModel.getMonthlyAttendanceSummary(
            employee_code,
            parseInt(year),
            parseInt(month)
        );

        // เพิ่มข้อมูลการหักเงิน
        const totalDeductions = summary.records.reduce(
            (sum, record) => sum + (record.deduction_amount || 0), 
            0
        );

        res.json({
            ...summary,
            totalDeductions,
            deductionDetails: summary.records
                .filter(record => record.deduction_amount > 0)
                .map(record => ({
                    date: record.check_in_time,
                    lateMinutes: record.late_minutes,
                    deductionAmount: record.deduction_amount,
                    isHalfDay: record.is_half_day_absent
                }))
        });
    } catch (error) {
        console.error('Error getting monthly summary:', error);
        res.status(500).json({ 
            error: 'Unable to get monthly attendance summary',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// จัดการกรณีลืม checkout
const handleMissingCheckout = async (req, res) => {
    const { date } = req.body;
    const employee_code = req.user.employee_code;

    try {
        const result = await attendanceModel.handleMissingCheckout(
            employee_code,
            new Date(date)
        );

        if (!result) {
            return res.status(404).json({ 
                message: 'ไม่พบข้อมูลการลงเวลาที่ยังไม่ได้ checkout' 
            });
        }

        res.json({
            message: 'บันทึก checkout อัตโนมัติสำเร็จ',
            data: result
        });
    } catch (error) {
        console.error('Error handling missing checkout:', error);
        res.status(500).json({ 
            error: 'ไม่สามารถบันทึก checkout อัตโนมัติได้',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
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
    updateCheckOut,
    getMonthlyAttendanceSummary,
    handleMissingCheckout
};
