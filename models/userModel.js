// models/userModel.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Store refresh token in database
const storeRefreshToken = async (employeeCode, refreshToken) => {
    return await prisma.refreshToken.upsert({
        where: { employee_code: employeeCode },
        update: { token: refreshToken },
        create: {
            employee_code: employeeCode,
            token: refreshToken,
        },
    });
};

// Get refresh token from database
const getRefreshToken = async (employeeCode) => {
    return await prisma.refreshToken.findUnique({
        where: { employee_code: employeeCode },
    });
};

module.exports = {
    storeRefreshToken,
    getRefreshToken,
};
