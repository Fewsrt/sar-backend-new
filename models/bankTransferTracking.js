const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all transfer trackings
const getAllTransferTrackings = async () => {
    return await prisma.bankTransferTracking.findMany({
        include: {
            car: true,
            bankEmployee: true,
        },
    });
};

// Get transfer tracking by ID
const getTransferTrackingById = async (trackingId) => {
    return await prisma.bankTransferTracking.findUnique({
        where: { tracking_id: parseInt(trackingId) },
        include: {
            car: true,
            bankEmployee: true,
        },
    });
};

// Get transfer trackings by car ID
const getTransferTrackingsByCarId = async (carId) => {
    return await prisma.bankTransferTracking.findMany({
        where: { car_id: parseInt(carId) },
        include: {
            car: true,
            bankEmployee: true,
        },
    });
};

// Get transfer trackings by bank employee ID
const getTransferTrackingsByBankEmployeeId = async (bankEmployeeId) => {
    return await prisma.bankTransferTracking.findMany({
        where: { bank_employee_id: parseInt(bankEmployeeId) },
        include: {
            car: true,
            bankEmployee: true,
        },
    });
};

// Create transfer tracking
const createTransferTracking = async ({
    car_id,
    follow_up_number,
    follow_up_date,
    bank_employee_id,
    follow_up_note
}) => {
    return await prisma.bankTransferTracking.create({
        data: {
            car_id: parseInt(car_id),
            follow_up_number: parseInt(follow_up_number),
            follow_up_date: new Date(follow_up_date),
            bank_employee_id: parseInt(bank_employee_id),
            follow_up_note
        },
        include: {
            car: true,
            bankEmployee: true,
        },
    });
};

// Update transfer tracking
const updateTransferTracking = async (trackingId, {
    follow_up_number,
    follow_up_date,
    bank_employee_id,
    follow_up_note
}) => {
    return await prisma.bankTransferTracking.update({
        where: { tracking_id: parseInt(trackingId) },
        data: {
            follow_up_number: follow_up_number ? parseInt(follow_up_number) : undefined,
            follow_up_date: follow_up_date ? new Date(follow_up_date) : undefined,
            bank_employee_id: bank_employee_id ? parseInt(bank_employee_id) : undefined,
            follow_up_note
        },
        include: {
            car: true,
            bankEmployee: true,
        },
    });
};

// Delete transfer tracking
const deleteTransferTracking = async (trackingId) => {
    return await prisma.bankTransferTracking.delete({
        where: { tracking_id: parseInt(trackingId) },
    });
};

module.exports = {
    getAllTransferTrackings,
    getTransferTrackingById,
    getTransferTrackingsByCarId,
    getTransferTrackingsByBankEmployeeId,
    createTransferTracking,
    updateTransferTracking,
    deleteTransferTracking,
}; 