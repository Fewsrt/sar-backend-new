const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');

// CORS options
const corsOptions = {
  origin: ['https://liff.line.me/2006519613-MpmgYvkZ', 'https://fewmanager-8adc1.firebaseapp.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'], // เพิ่ม PATCH ที่นี่
  allowedHeaders: ['Content-Type', 'Authorization', 'x-line-request'],
  credentials: true,
  optionsSuccessStatus: 204,
  preflightContinue: false
};

// Security middleware
const securityMiddleware = [
  helmet(), // Secure HTTP headers
  cors(corsOptions),
  xss(), // Sanitize inputs
  hpp(), // Prevent HTTP Parameter Pollution
];

module.exports = securityMiddleware; 