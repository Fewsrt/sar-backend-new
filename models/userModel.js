// models/userModel.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Store refresh token in database
const storeRefreshToken = async (employeeCode, adminId, refreshToken) => {
    if (!employeeCode && !adminId) {
        throw new Error('Either employeeCode or adminId must be provided');
    }

    return await prisma.refreshToken.upsert({
        where: {
            employee_code: employeeCode || undefined, // ใช้ employeeCode ถ้ามี
            admin_id: adminId || undefined // ใช้ adminId ถ้ามี
        },
        update: {
            token: refreshToken,
            createdAt: new Date() // อัปเดตวันที่สร้าง
        },
        create: {
            token: refreshToken,
            employee_code: employeeCode || null, // ใช้ employeeCode ถ้ามี
            admin_id: adminId || null // ใช้ adminId ถ้ามี
        }
    });
};

// Get refresh token from database
const getRefreshToken = async (employeeCode, adminId) => {
    return await prisma.refreshToken.findFirst({
        where: {
            employee_code: employeeCode || null, // ใช้ employeeCode ถ้ามี
            admin_id: adminId || null // ใช้ adminId ถ้ามี
        },
    });
};

module.exports = {
    storeRefreshToken,
    getRefreshToken,
};
