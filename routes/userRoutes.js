const express = require('express');
const { changePassword } = require('../controllers/employee/userController');
const authenticateToken = require('../middleware/authenticateToken');

const router = express.Router();

// Change password route with rate limiting
router.post('/change-password', 
    authenticateToken, 
    changePassword
);

module.exports = router; 