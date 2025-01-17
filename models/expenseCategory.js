const prisma = require('../config/db');

// Create
async function createExpenseCategory(data) {
    return await prisma.expensecategory.create({
        data: {
            name: data.name,
            code: data.code,
            type: data.type
        }
    });
}

// Read One
async function getExpenseCategory(id) {
    return await prisma.expensecategory.findUnique({
        where: { 
            id,
            deleted_at: null
        },
        include: {
            expenses: true
        }
    });
}

// Read All
async function getAllExpenseCategories() {
    return await prisma.expensecategory.findMany({
        where: {
            deleted_at: null
        },
        orderBy: {
            name: 'asc'
        }
    });
}

// Update
async function updateExpenseCategory(id, data) {
    return await prisma.expensecategory.update({
        where: { id },
        data: {
            ...data,
            updated_at: new Date()
        }
    });
}

// Delete (Soft Delete)
async function deleteExpenseCategory(id) {
    return await prisma.expensecategory.update({
        where: { id },
        data: {
            deleted_at: new Date()
        }
    });
}

module.exports = {
    createExpenseCategory,
    getExpenseCategory,
    getAllExpenseCategories,
    updateExpenseCategory,
    deleteExpenseCategory
}; 