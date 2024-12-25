const express = require('express');
const { getSubmodelsByModel } = require('../controllers/employee/carSubmodelController');
const authenticateToken = require('../middleware/authenticateToken');

const router = express.Router();

// Get submodels by model ID
router.get('/model/:modelId', authenticateToken, getSubmodelsByModel);

module.exports = router; 