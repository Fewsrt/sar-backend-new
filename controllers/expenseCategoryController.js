const { 
    createExpenseCategory, 
    getExpenseCategory, 
    getAllExpenseCategories, 
    updateExpenseCategory, 
    deleteExpenseCategory 
} = require('../models/expenseCategory');

// Create
async function addExpenseCategory(req, res) {
    try {
        const newCategory = await createExpenseCategory(req.body);
        res.status(201).json({
            success: true,
            data: newCategory
        });
    } catch (error) {
        console.error('Error creating expense category:', error);
        res.status(500).json({ 
            success: false,
            error: 'Failed to create expense category',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

// Read One
async function getExpenseCategoryById(req, res) {
    try {
        const category = await getExpenseCategory(parseInt(req.params.id));
        if (!category) {
            return res.status(404).json({
                success: false,
                error: 'Expense category not found'
            });
        }
        res.json({
            success: true,
            data: category
        });
    } catch (error) {
        console.error('Error fetching expense category:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch expense category',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

// Read All
async function getAllExpenseCategoriesHandler(req, res) {
    try {
        const categories = await getAllExpenseCategories();
        res.json({
            success: true,
            data: categories
        });
    } catch (error) {
        console.error('Error fetching expense categories:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch expense categories',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

// Update
async function updateExpenseCategoryById(req, res) {
    try {
        const updatedCategory = await updateExpenseCategory(parseInt(req.params.id), req.body);
        res.json({
            success: true,
            data: updatedCategory
        });
    } catch (error) {
        console.error('Error updating expense category:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update expense category',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

// Delete
async function deleteExpenseCategoryById(req, res) {
    try {
        await deleteExpenseCategory(parseInt(req.params.id));
        res.json({
            success: true,
            message: 'Expense category deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting expense category:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to delete expense category',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

module.exports = {
    addExpenseCategory,
    getExpenseCategoryById,
    getAllExpenseCategoriesHandler,
    updateExpenseCategoryById,
    deleteExpenseCategoryById
}; 