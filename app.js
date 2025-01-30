require('dotenv').config();
require("./instrument.js");

const express = require('express');
const Sentry = require("@sentry/node");
const figlet = require('figlet');
const swaggerUi = require('swagger-ui-express');
const http = require('http');
const os = require('os');
// const createSocketServer = require('./config/socketConfig');

// Import cron jobs
require('./jobs/checkoutReminder');

// Import middlewares
const securityMiddleware = require('./middleware/security.js');
const { errorHandler, AppError } = require('./middleware/errorHandler.js');
const { loggerMiddleware, logger } = require('./middleware/logger.js');
const requestLogger = require('./middleware/requestLogger');
const apiLimiter = require('./middleware/rateLimiter');
const cache = require('./middleware/cache.js');
require("./instrument.js");

const routes = require('./routes/index.js');
const setupRoutes = require('./routes/SystemRoutes/setupRoutes.js');
const { requireInitialized } = require('./middleware/setupCheck');
const onlineTracker = require('./middleware/onlineTracker');

const app = express();
const server = http.createServer(app);
// const io = createSocketServer(server);

app.use(loggerMiddleware);
app.use(apiLimiter);
app.use(requestLogger);

// Enable trust proxy
app.set('trust proxy', 1);
// Sentry.setupExpressErrorHandler(app);
// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Security middleware (includes helmet, cors, rate limiting, etc.)
app.use(securityMiddleware);

// API Documentation - ไม่ต้องการ authentication
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(require('./swagger.json')));

// Setup routes (ไม่ต้องการ authentication)
app.use('/api', setupRoutes);

// API routes (ต้องการ authentication และ system initialization)
app.use('/api', requireInitialized, routes);

// Global Error Handler
app.use((err, req, res, next) => {
    logger.error('An error occurred', { message: err.message, stack: err.stack });
    res.status(500).json({ error: 'Internal server error' });
});

// ตัวอย่างการบันทึก warning
// app.use((req, res, next) => {
//     if (someConditionThatMightBeAProblem) {
//         logger.warn('This is a warning message', { userId: req.user?.id });
//     }
//     next();
// });

// 404 Handler
app.use('*', (req, res) => {
    logger.warn('Route not found', { url: req.originalUrl });
    res.status(404).json({
        status: 'error',
        message: `Route ${req.originalUrl} not found`
    });
});

// Global Error Handler
app.use(errorHandler);

// หลังจาก authentication middleware
app.use(onlineTracker);

const onlineStatusService = require('./services/onlineStatusService');

// Socket.io connection
// io.on('connection', async (socket) => {

//     // ดึงข้อมูลสถานะออนไลน์จากบริการ
//     const onlineUsers = await onlineStatusService.getAllOnlineUsers();

//     // ส่งข้อมูลสถานะออนไลน์เมื่อมีการเชื่อมต่อ
//     socket.emit('onlineStatus', {
//         users: onlineUsers // ส่งข้อมูลผู้ใช้ที่ออนไลน์
//     });

//     // ส่งข้อมูลสถานะเซิร์ฟเวอร์
//     const serverStatus = {
//         status: 'OK',
//         uptime: process.uptime(),
//         memoryUsage: process.memoryUsage(),
//         timestamp: new Date().toISOString()
//     };
//     socket.emit('serverStatus', serverStatus);

//     // เมื่อมีการตัดการเชื่อมต่อ
//     socket.on('disconnect', () => {
//     });
// });

// setInterval(() => {
//     const serverStatus = {
//         status: 'OK',
//         uptime: process.uptime(),
//         memoryUsage: process.memoryUsage(),
//         timestamp: new Date().toISOString()
//     };
//     io.emit('serverStatus', serverStatus); // ส่งข้อมูลสถานะเซิร์ฟเวอร์
// }, 100); // ทุก ๆ 10 วินาที

// Server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);

  // Get the network interfaces
  const networkInterfaces = os.networkInterfaces();
  let serverIP = '';

  // Loop through the network interfaces to find the IP address
  for (const interface in networkInterfaces) {
    for (const address of networkInterfaces[interface]) {
      // Check if the address is IPv4 and not a loopback address
      if (address.family === 'IPv4' && !address.internal) {
        serverIP = address.address;
        break;
      }
    }
    if (serverIP) break; // Exit the loop if IP is found
  }

  // Log the server IP address
  logger.info(`Server IP address: ${serverIP}`);

  // ASCII art banner
  figlet('SAR Backend API!', function(err, data) {
    if (err) {
      logger.error('Something went wrong with figlet');
      logger.error(err);
      return;
    }
    console.log(data);
  });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    logger.info('Process terminated!');
  });
});

module.exports = app;

/**
 * Copyright (c) 2024 SAR Car Sales ERP System. All rights reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */



