const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all accounting records
const getAllAccounting = async () => {
    return await prisma.accounting.findMany({
        include: {
            car: true,
            branch: true,
        },
    });
};

// Get accounting by ID
const getAccountingById = async (accountingId) => {
    return await prisma.accounting.findUnique({
        where: { accounting_id: parseInt(accountingId) },
        include: {
            car: true,
            branch: true,
        },
    });
};

// Get accounting records by branch ID
const getAccountingByBranchId = async (branchId) => {
    return await prisma.accounting.findMany({
        where: { branch_id: parseInt(branchId) },
        include: {
            car: true,
            branch: true,
        },
    });
};

// Get accounting records by car ID
const getAccountingByCarId = async (carId) => {
    return await prisma.accounting.findMany({
        where: { car_id: parseInt(carId) },
        include: {
            car: true,
            branch: true,
        },
    });
};

// Create accounting record
const createAccounting = async ({
    transaction_type,
    amount,
    transaction_date,
    description,
    car_id,
    branch_id
}) => {
    return await prisma.accounting.create({
        data: {
            transaction_type,
            amount: parseFloat(amount),
            transaction_date: new Date(transaction_date),
            description,
            car_id: car_id ? parseInt(car_id) : null,
            branch_id: parseInt(branch_id)
        },
        include: {
            car: true,
            branch: true,
        },
    });
};

// Update accounting record
const updateAccounting = async (accountingId, {
    transaction_type,
    amount,
    transaction_date,
    description,
    car_id,
    branch_id
}) => {
    return await prisma.accounting.update({
        where: { accounting_id: parseInt(accountingId) },
        data: {
            transaction_type,
            amount: amount ? parseFloat(amount) : undefined,
            transaction_date: transaction_date ? new Date(transaction_date) : undefined,
            description,
            car_id: car_id ? parseInt(car_id) : null,
            branch_id: branch_id ? parseInt(branch_id) : undefined
        },
        include: {
            car: true,
            branch: true,
        },
    });
};

// Delete accounting record
const deleteAccounting = async (accountingId) => {
    return await prisma.accounting.delete({
        where: { accounting_id: parseInt(accountingId) },
    });
};

module.exports = {
    getAllAccounting,
    getAccountingById,
    getAccountingByBranchId,
    getAccountingByCarId,
    createAccounting,
    updateAccounting,
    deleteAccounting,
}; 