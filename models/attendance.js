// models/attendance.js
const prisma = require('../config/db');

// Get list of attendance records with salary relation
const getAttendanceRecords = async () => {
    return await prisma.attendance.findMany({
        include: {
            employee: true,
            salary: true,
        },
    });
};

// Get attendance record by ID with salary relation
const getAttendanceById = async (attendanceId) => {
    return await prisma.attendance.findUnique({
        where: { attendance_id: parseInt(attendanceId) },
        include: {
            employee: true,
            salary: true,
        },
    });
};

// Get attendance records by employee code with date range
const getAttendanceRecordsByEmployeeCode = async (employeeCode, startDate, endDate) => {
    return await prisma.attendance.findMany({
        where: { 
            employee_code: employeeCode,
            check_in_time: {
                gte: startDate ? new Date(startDate) : undefined,
                lte: endDate ? new Date(endDate) : undefined,
            }
        },
        include: {
            employee: true,
            salary: true,
        },
    });
};

// คำนวณเวลาสาย และค่าปรับ
const calculateLateDeduction = async (checkInTime, workshiftId) => {
    // ดึงข้อมูล workshift
    const workshift = await prisma.workshift.findUnique({
        where: { id: workshiftId },
        include: {
            deduction_rules: true
        }
    });

    if (!workshift) return { lateMinutes: 0, deductionAmount: 0, isHalfDay: false };

    // แปลงเวลาเข้างานเป็นนาที
    const [shiftHour, shiftMinute] = workshift.start_time.split(':');
    const shiftStartTime = new Date(checkInTime);
    shiftStartTime.setHours(parseInt(shiftHour), parseInt(shiftMinute), 0, 0);

    // คำนวณจำนวนนาทีที่สาย
    const lateMinutes = Math.max(0, Math.round((checkInTime - shiftStartTime) / (1000 * 60)));

    // ถ้าไม่สาย หรือ อยู่ในช่วงผ่อนผัน
    if (lateMinutes <= workshift.grace_period) {
        return { lateMinutes: 0, deductionAmount: 0, isHalfDay: false };
    }

    // หากฎการหักเงินที่เหมาะสม
    const applicableRule = workshift.deduction_rules
        .sort((a, b) => b.late_minutes - a.late_minutes)
        .find(rule => lateMinutes >= rule.late_minutes);

    return {
        lateMinutes,
        deductionAmount: applicableRule ? applicableRule.deduction_amount : 0,
        isHalfDay: applicableRule ? applicableRule.is_half_day : false
    };
};

// คำนวณชั่วโมงการทำงาน
const calculateWorkHours = (checkIn, checkOut) => {
    if (!checkOut) return 0;
    
    // แปลงเป็น milliseconds
    const diffMs = checkOut.getTime() - checkIn.getTime();
    
    // แปลงเป็นชั่วโมง (1 ชม = 3600000 milliseconds)
    const hours = diffMs / (1000 * 60 * 60);
    
    // ปัดเศษทศนิยม 2 ตำแหน่ง
    return Math.round(hours * 100) / 100;
};

// Create a new attendance record
const createAttendance = async ({ 
    employee_code, 
    check_in_time, 
    check_in_latitude, 
    check_in_longitude, 
    status,
    note 
}) => {
    // ดึงข้อมูล workshift ของพนักงาน
    const employee = await prisma.employee.findUnique({
        where: { employee_code },
        include: { work_shift: true }
    });

    if (!employee.work_shift) {
        throw new Error('Employee has no assigned work shift');
    }

    const checkInDateTime = new Date(check_in_time);
    const { lateMinutes, deductionAmount, isHalfDay } = await calculateLateDeduction(
        checkInDateTime,
        employee.work_shift.id
    );

    return await prisma.attendance.create({
        data: {
            employee_code,
            check_in_time: checkInDateTime,
            check_in_latitude,
            check_in_longitude,
            status,
            note,
            work_shift_id: employee.work_shift.id,
            late_minutes: lateMinutes,
            deduction_amount: deductionAmount,
            is_half_day_absent: isHalfDay,
            work_hours: calculateWorkHours(checkInDateTime, new Date())
        },
        include: {
            employee: true,
            work_shift: true
        }
    });
};

// Update attendance record with work hours calculation
const updateAttendance = async (attendanceId, { 
    check_out_time, 
    check_out_latitude, 
    check_out_longitude, 
    status, 
    note 
}) => {
    const attendance = await prisma.attendance.findUnique({
        where: { attendance_id: parseInt(attendanceId) }
    });

    let work_hours = 0;
    if (check_out_time && attendance.check_in_time) {
        const checkOut = new Date(check_out_time);
        const checkIn = new Date(attendance.check_in_time);
        work_hours = (checkOut - checkIn) / (1000 * 60 * 60); // Convert to hours
    }

    return await prisma.attendance.update({
        where: { attendance_id: parseInt(attendanceId) },
        data: {
            check_out_time: check_out_time ? new Date(check_out_time) : undefined,
            check_out_latitude,
            check_out_longitude,
            status,
            note,
            work_hours: work_hours || undefined,
        },
        include: {
            salary: true
        }
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

// Get monthly attendance summary
const getMonthlyAttendanceSummary = async (employeeCode, year, month) => {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const attendances = await prisma.attendance.findMany({
        where: {
            employee_code: employeeCode,
            check_in_time: {
                gte: startDate,
                lte: endDate
            }
        },
        include: {
            employee: true
        }
    });

    const summary = {
        totalDays: attendances.length,
        totalWorkHours: attendances.reduce((sum, att) => sum + (att.work_hours || 0), 0),
        presentDays: attendances.filter(att => att.status === 'PRESENT').length,
        lateDays: attendances.filter(att => att.status === 'LATE').length,
        absentDays: attendances.filter(att => att.status === 'ABSENT').length,
        leaveDays: attendances.filter(att => att.status === 'ON_LEAVE').length
    };

    return summary;
};

// ตรวจสอบและอัพเดท attendance ที่ยังไม่ได้ check out
const handleMissingCheckout = async (employeeCode, date) => {
    try {
        // หา attendance ที่ยังไม่ได้ check out
        const attendance = await prisma.attendance.findFirst({
            where: {
                employee_code: employeeCode,
                check_in_time: {
                    gte: new Date(date.setHours(0, 0, 0)),
                    lt: new Date(date.setHours(23, 59, 59))
                },
                check_out_time: null
            },
            include: {
                employee: {
                    include: {
                        work_shift: true
                    }
                }
            }
        });

        if (attendance) {
            // คำนวณเวลา check out จาก work shift
            const checkInDate = new Date(attendance.check_in_time);
            const [endHour, endMinute] = attendance.employee.work_shift.end_time.split(':');
            const defaultCheckOut = new Date(checkInDate);
            defaultCheckOut.setHours(parseInt(endHour), parseInt(endMinute), 0);

            // อัพเดท attendance
            return await prisma.attendance.update({
                where: { attendance_id: attendance.attendance_id },
                data: {
                    check_out_time: defaultCheckOut,
                    status: 'MISSING_CHECKOUT',
                    note: attendance.note 
                        ? `${attendance.note} (ระบบบันทึก checkout อัตโนมัติ)`
                        : 'ระบบบันทึก checkout อัตโนมัติ'
                }
            });
        }
        return null;
    } catch (error) {
        console.error('Error handling missing checkout:', error);
        throw error;
    }
};

module.exports = {
    getAttendanceRecords,
    getAttendanceById,
    getAttendanceRecordsByEmployeeCode,
    createAttendance,
    updateAttendance,
    deleteAttendance,
    getLatestAttendanceByEmployeeCode,
    getMonthlyAttendanceSummary,
    calculateLateDeduction,
    handleMissingCheckout
};
