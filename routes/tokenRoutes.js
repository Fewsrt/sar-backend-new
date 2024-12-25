// routes/tokenRoutes.js
const express = require('express');
const { refreshAccessToken } = require('../controllers/employee/tokenController');
const router = express.Router();

// Refresh Access Token route
router.post('/refresh', refreshAccessToken);

module.exports = router;