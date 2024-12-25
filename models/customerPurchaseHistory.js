const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all purchase histories
const getAllPurchaseHistories = async () => {
    return await prisma.customerPurchaseHistory.findMany({
        include: {
            customer: true,
            car: true,
        },
    });
};

// Get purchase history by ID
const getPurchaseHistoryById = async (historyId) => {
    return await prisma.customerPurchaseHistory.findUnique({
        where: { history_id: parseInt(historyId) },
        include: {
            customer: true,
            car: true,
        },
    });
};

// Get purchase histories by customer ID
const getPurchaseHistoriesByCustomerId = async (customerId) => {
    return await prisma.customerPurchaseHistory.findMany({
        where: { customer_id: parseInt(customerId) },
        include: {
            customer: true,
            car: true,
        },
    });
};

// Get purchase histories by car ID
const getPurchaseHistoriesByCarId = async (carId) => {
    return await prisma.customerPurchaseHistory.findMany({
        where: { car_id: parseInt(carId) },
        include: {
            customer: true,
            car: true,
        },
    });
};

// Create purchase history
const createPurchaseHistory = async ({
    customer_id,
    car_id,
    purchase_date,
    purchase_price
}) => {
    return await prisma.customerPurchaseHistory.create({
        data: {
            customer_id: parseInt(customer_id),
            car_id: parseInt(car_id),
            purchase_date: purchase_date ? new Date(purchase_date) : null,
            purchase_price: purchase_price ? parseFloat(purchase_price) : null
        },
        include: {
            customer: true,
            car: true,
        },
    });
};

// Update purchase history
const updatePurchaseHistory = async (historyId, {
    purchase_date,
    purchase_price
}) => {
    return await prisma.customerPurchaseHistory.update({
        where: { history_id: parseInt(historyId) },
        data: {
            purchase_date: purchase_date ? new Date(purchase_date) : undefined,
            purchase_price: purchase_price ? parseFloat(purchase_price) : undefined
        },
        include: {
            customer: true,
            car: true,
        },
    });
};

// Delete purchase history
const deletePurchaseHistory = async (historyId) => {
    return await prisma.customerPurchaseHistory.delete({
        where: { history_id: parseInt(historyId) },
    });
};

module.exports = {
    getAllPurchaseHistories,
    getPurchaseHistoryById,
    getPurchaseHistoriesByCustomerId,
    getPurchaseHistoriesByCarId,
    createPurchaseHistory,
    updatePurchaseHistory,
    deletePurchaseHistory,
}; 