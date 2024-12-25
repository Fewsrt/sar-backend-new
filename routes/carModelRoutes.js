const express = require('express');
const { createCarModel, getCarModels, getCarModelsByBrand } = require('../controllers/employee/carModelController');
const authenticateToken = require('../middleware/authenticateToken');
const authorizeRoles = require('../middleware/roleMiddleware');

const router = express.Router();

// Create a new car model
router.post('/', authenticateToken, authorizeRoles('admin'), createCarModel);

// Get all car models
router.get('/', authenticateToken, getCarModels);

// Get car models by brand ID
router.get('/brand/:brandId', authenticateToken, getCarModelsByBrand);

module.exports = router; 