const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all bank employees
const getAllBankEmployees = async () => {
    return await prisma.bankEmployee.findMany({
        include: {
            bankTransferTracking: true,
        },
    });
};

// Get bank employee by ID
const getBankEmployeeById = async (bankEmployeeId) => {
    return await prisma.bankEmployee.findUnique({
        where: { bank_employee_id: parseInt(bankEmployeeId) },
        include: {
            bankTransferTracking: true,
        },
    });
};

// Get bank employee by email
const getBankEmployeeByEmail = async (email) => {
    return await prisma.bankEmployee.findUnique({
        where: { email },
        include: {
            bankTransferTracking: true,
        },
    });
};

// Get bank employee by phone
const getBankEmployeeByPhone = async (phone) => {
    return await prisma.bankEmployee.findUnique({
        where: { phone },
        include: {
            bankTransferTracking: true,
        },
    });
};

// Create bank employee
const createBankEmployee = async ({
    bank_name,
    employee_name,
    phone,
    email,
    position,
    note
}) => {
    return await prisma.bankEmployee.create({
        data: {
            bank_name,
            employee_name,
            phone,
            email,
            position,
            note
        },
    });
};

// Update bank employee
const updateBankEmployee = async (bankEmployeeId, {
    bank_name,
    employee_name,
    phone,
    email,
    position,
    note
}) => {
    return await prisma.bankEmployee.update({
        where: { bank_employee_id: parseInt(bankEmployeeId) },
        data: {
            bank_name,
            employee_name,
            phone,
            email,
            position,
            note
        },
    });
};

// Delete bank employee
const deleteBankEmployee = async (bankEmployeeId) => {
    return await prisma.bankEmployee.delete({
        where: { bank_employee_id: parseInt(bankEmployeeId) },
    });
};

module.exports = {
    getAllBankEmployees,
    getBankEmployeeById,
    getBankEmployeeByEmail,
    getBankEmployeeByPhone,
    createBankEmployee,
    updateBankEmployee,
    deleteBankEmployee,
}; 