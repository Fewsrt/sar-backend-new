const cron = require('node-cron');
const prisma = require('../config/db');
const attendanceModel = require('../models/attendance');

// รันทุกวันเวลา 19:00 น. สำหรับเช็คคนไม่ลงเวลา
cron.schedule('0 19 * * *', async () => {
    try {
        const today = new Date();
        
        // ดึงรายชื่อพนักงานทั้งหมดที่ active
        const employees = await prisma.employee.findMany({
            where: {
                status: 'ACTIVE',
                // เพิ่มเงื่อนไขอื่นๆ ตามต้องการ เช่น ไม่รวมพนักงานที่ลา
            },
            include: {
                work_shift: true
            }
        });

        // ตรวจสอบการลงเวลาของแต่ละคน
        for (const employee of employees) {
            // เช็คว่ามีการลงเวลาวันนี้หรือไม่
            const attendance = await prisma.attendance.findFirst({
                where: {
                    employee_code: employee.employee_code,
                    check_in_time: {
                        gte: new Date(today.setHours(0, 0, 0)),
                        lt: new Date(today.setHours(23, 59, 59))
                    }
                }
            });

            // เช็คว่ามีการลาในวันนี้หรือไม่
            const leave = await prisma.leave.findFirst({
                where: {
                    employee_code: employee.employee_code,
                    start_date: {
                        lte: today
                    },
                    end_date: {
                        gte: today
                    },
                    status: 'APPROVED'
                }
            });

            // ถ้าไม่มีการลงเวลาและไม่ได้ลา ให้บันทึก ABSENT
            if (!attendance && !leave) {
                await prisma.attendance.create({
                    data: {
                        employee_code: employee.employee_code,
                        check_in_time: new Date(today.setHours(8, 30, 0)),  // default time
                        check_out_time: new Date(today.setHours(17, 30, 0)), // default time
                        status: 'ABSENT',
                        note: 'ระบบบันทึกอัตโนมัติ - ไม่พบการลงเวลาทำงาน',
                        work_shift_id: employee.work_shift_id  // ใช้ work_shift_id แทน
                    }
                });
            }
        }

        console.log('Processed absent records for employees without attendance');
    } catch (error) {
        console.error('Error processing absent records:', error);
    }
});

// รันทุกวันเวลา 00:05 น. สำหรับเช็คคนลืม checkout
cron.schedule('5 0 * * *', async () => {
    try {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        // หา attendance ที่ยังไม่ได้ checkout ทั้งหมด
        const missingCheckouts = await prisma.attendance.findMany({
            where: {
                check_in_time: {
                    gte: new Date(yesterday.setHours(0, 0, 0)),
                    lt: new Date(yesterday.setHours(23, 59, 59))
                },
                check_out_time: null
            },
            include: {
                employee: true
            }
        });

        // จัดการ missing checkouts
        for (const attendance of missingCheckouts) {
            await attendanceModel.handleMissingCheckout(
                attendance.employee_code,
                yesterday
            );
        }

        console.log(`Processed ${missingCheckouts.length} missing checkouts`);
    } catch (error) {
        console.error('Error processing missing checkouts:', error);
    }
}); 