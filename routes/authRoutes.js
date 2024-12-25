const router = require('express').Router();
const { login, generateLineToken, renewAccessToken, logout } = require('../controllers/employee/authController');
const asyncHandler = require('../middleware/asyncHandler');
const authenticateToken = require('../middleware/authenticateToken');

router
  .post('/login', asyncHandler(login))
  .post('/line-login', asyncHandler(generateLineToken))
  .post('/renewaccesstoken', asyncHandler(renewAccessToken))
  .post('/logout', authenticateToken, asyncHandler(logout));

module.exports = router;
