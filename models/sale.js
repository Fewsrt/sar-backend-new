const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all sales
const getAllSales = async () => {
    return await prisma.sale.findMany({
        include: {
            car: true,
            customer: true,
            employee: true,
            branch: true,
        },
    });
};

// Get sale by ID
const getSaleById = async (saleId) => {
    return await prisma.sale.findUnique({
        where: { sale_id: parseInt(saleId) },
        include: {
            car: true,
            customer: true,
            employee: true,
            branch: true,
        },
    });
};

// Get sales by customer ID
const getSalesByCustomerId = async (customerId) => {
    return await prisma.sale.findMany({
        where: { customer_id: parseInt(customerId) },
        include: {
            car: true,
            customer: true,
            employee: true,
            branch: true,
        },
    });
};

// Get sales by salesperson ID
const getSalesBySalespersonId = async (salespersonId) => {
    return await prisma.sale.findMany({
        where: { salesperson_id: parseInt(salespersonId) },
        include: {
            car: true,
            customer: true,
            employee: true,
            branch: true,
        },
    });
};

// Get sales by branch ID
const getSalesByBranchId = async (branchId) => {
    return await prisma.sale.findMany({
        where: { branchBranch_id: parseInt(branchId) },
        include: {
            car: true,
            customer: true,
            employee: true,
            branch: true,
        },
    });
};

// Create sale
const createSale = async ({
    car_id,
    customer_id,
    sale_date,
    sale_price,
    salesperson_id,
    branchBranch_id
}) => {
    return await prisma.sale.create({
        data: {
            car_id: parseInt(car_id),
            customer_id: parseInt(customer_id),
            sale_date: new Date(sale_date),
            sale_price: parseFloat(sale_price),
            salesperson_id: parseInt(salesperson_id),
            branchBranch_id: branchBranch_id ? parseInt(branchBranch_id) : null
        },
        include: {
            car: true,
            customer: true,
            employee: true,
            branch: true,
        },
    });
};

// Update sale
const updateSale = async (saleId, {
    sale_date,
    sale_price,
    branchBranch_id
}) => {
    return await prisma.sale.update({
        where: { sale_id: parseInt(saleId) },
        data: {
            sale_date: sale_date ? new Date(sale_date) : undefined,
            sale_price: sale_price ? parseFloat(sale_price) : undefined,
            branchBranch_id: branchBranch_id ? parseInt(branchBranch_id) : undefined
        },
        include: {
            car: true,
            customer: true,
            employee: true,
            branch: true,
        },
    });
};

// Delete sale
const deleteSale = async (saleId) => {
    return await prisma.sale.delete({
        where: { sale_id: parseInt(saleId) },
    });
};

module.exports = {
    getAllSales,
    getSaleById,
    getSalesByCustomerId,
    getSalesBySalespersonId,
    getSalesByBranchId,
    createSale,
    updateSale,
    deleteSale,
}; 