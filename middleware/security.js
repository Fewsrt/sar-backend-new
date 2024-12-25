const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');

// CORS options
const corsOptions = {
  origin: 'http://localhost:8080', // ระบุ origin ที่อนุญาต
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // ระบุ methods ที่อนุญาต
  allowedHeaders: ['Content-Type', 'Authorization'], // ระบุ headers ที่อนุญาต
  credentials: true // อนุญาตให้ส่ง cookies
};

// Security middleware
const securityMiddleware = [
  helmet(), // Secure HTTP headers
  cors(corsOptions),
  xss(), // Sanitize inputs
  hpp(), // Prevent HTTP Parameter Pollution
];

module.exports = securityMiddleware; 