const router = require('express').Router();
const authenticateToken = require('../middleware/authenticateToken');
const {
    addExpenseCategory,
    getExpenseCategoryById,
    getAllExpenseCategoriesHandler,
    updateExpenseCategoryById,
    deleteExpenseCategoryById
} = require('../controllers/expenseCategoryController');
const asyncHandler = require('../middleware/asyncHandler');

// CRUD Routes
router.route('/')
    .get(authenticateToken, asyncHandler(getAllExpenseCategoriesHandler))
    .post(authenticateToken, asyncHandler(addExpenseCategory));

router.route('/:id')
    .get(authenticateToken, asyncHandler(getExpenseCategoryById))
    .put(authenticateToken, asyncHandler(updateExpenseCategoryById))
    .delete(authenticateToken, asyncHandler(deleteExpenseCategoryById));

module.exports = router; 