// models/supplier.js
const prisma = require('../config/db');

// Get list of suppliers
const getSuppliers = async () => {
    return await prisma.supplier.findMany({
    });
};

// Get supplier by ID
const getSupplierById = async (supplierId) => {
    return await prisma.supplier.findUnique({
        where: { supplier_id: parseInt(supplierId) },
    });
};

// Create a new supplier
const createSupplier = async ({ supplier_code, supplier_name, branch_name, tax_id }) => {
    return await prisma.supplier.create({
        data: {
            supplier_code,
            supplier_name,
            branch_name,
            tax_id,
        },
    });
};

// Update supplier by ID
const updateSupplier = async (supplierId, { supplier_code, supplier_name, branch_name, tax_id }) => {
    return await prisma.supplier.update({
        where: { supplier_id: parseInt(supplierId) },
        data: {
            supplier_code,
            supplier_name,
            branch_name,
            tax_id,
        },
    });
};

// Delete supplier by ID
const deleteSupplier = async (supplierId) => {
    return await prisma.supplier.delete({
        where: { supplier_id: parseInt(supplierId) },
    });
};

module.exports = {
    getSuppliers,
    getSupplierById,
    createSupplier,
    updateSupplier,
    deleteSupplier,
};
