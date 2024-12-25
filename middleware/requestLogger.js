const prisma = require('../config/db');

const requestLogger = async (req, res, next) => {
    const start = process.hrtime();

    // Log after response
    res.on('finish', async () => {
        const [seconds, nanoseconds] = process.hrtime(start);
        const duration = seconds * 1000 + nanoseconds / 1000000;

        try {
            await prisma.systemLog.create({
                data: {
                    level: 'info',
                    type: 'api_request',
                    user_id: req.user?.id,
                    action: `${req.method} ${req.originalUrl}`,
                    details: {
                        method: req.method,
                        url: req.originalUrl,
                        status: res.statusCode,
                        duration: `${duration.toFixed(2)}ms`,
                        query: req.query,
                        body: req.method !== 'GET' ? req.body : undefined
                    },
                    ip: req.ip,
                    user_agent: req.headers['user-agent']
                }
            });
        } catch (error) {
            console.error('Error logging request:', error);
        }
    });

    next();
};

module.exports = requestLogger; 