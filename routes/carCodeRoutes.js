const express = require('express');
const { getCarCode } = require('../controllers/employee/carCodeController');
const authenticateToken = require('../middleware/authenticateToken');

const router = express.Router();

// Route สำหรับสร้างรหัสรถยนต์
router.get('/generate', authenticateToken, getCarCode);

module.exports = router; 