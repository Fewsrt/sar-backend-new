const express = require('express');
const { getCarBrands } = require('../controllers/employee/carBrandController');
const authenticateToken = require('../middleware/authenticateToken');

const router = express.Router();

// Get all car brands
router.get('/', authenticateToken, getCarBrands);

module.exports = router; 