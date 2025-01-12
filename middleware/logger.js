const winston = require('winston');
require('winston-daily-rotate-file');

// สร้าง custom format สำหรับ console
const consoleFormat = winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.printf(({ level, message, timestamp, ...metadata }) => {
        let msg = `${timestamp} [${level}]: ${message}`;
        
        // ถ้ามี metadata เพิ่มเติม จะแสดงในรูปแบบ JSON
        if (Object.keys(metadata).length > 0) {
            msg += ` ${JSON.stringify(metadata)}`;
        }
        
        return msg;
    })
);

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.DailyRotateFile({
            filename: 'logs/error-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            level: 'error',
            maxSize: '20m',
            maxFiles: '14d'
        }),
        new winston.transports.DailyRotateFile({
            filename: 'logs/warn-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            level: 'warn',
            maxSize: '20m',
            maxFiles: '14d'
        }),
        new winston.transports.DailyRotateFile({
            filename: 'logs/info-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            level: 'info',
            maxSize: '20m',
            maxFiles: '14d'
        }),
        new winston.transports.DailyRotateFile({
            filename: 'logs/debug-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            level: 'debug',
            maxSize: '20m',
            maxFiles: '14d'
        }),
        new winston.transports.Console({
            format: consoleFormat // ใช้ custom format สำหรับ console
        })
    ]
});

// Middleware for logging requests
const loggerMiddleware = (req, res, next) => {
    // ปรับปรุงวิธีการ log ข้อมูล
    logger.info('Incoming request', {
        method: req.method,
        url: req.url,
        ip: req.ip,
        userId: req.user?.id
    });
    next();
};

module.exports = {
    logger,
    loggerMiddleware
}; 