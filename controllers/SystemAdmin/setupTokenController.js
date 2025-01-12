const crypto = require('crypto');
const redisClient = require('../../config/redis');
const { logger } = require('../../middleware/logger');

const SETUP_TOKEN_PREFIX = '2s7UEMojr2xZv3W1RzI7hb8BbkDGkbrYGQUQJWUtLEXRKZRm7dhssJF6zs3FKfTK7a9xpjB8U1YlCOKoOBdZciM4wiOeeo7ZB33RO60kJarZAI5lGrl8iPy75RcrriVEXdqkXtLoHvhKJG18gxEXvZo5DH1gtgkWHF7yLI9oK5IxATD2Xh7Xrz7cLAT1KZ8yDPRAiH4HzAUdyEDAUZsLYc0ss9qFmaOwifIEfrqRUfU6yP9flFzA14AX1KQS';
const TOKEN_EXPIRY = 600; // 10 minutes in seconds

const generateSetupToken = async (req, res) => {
    try {
        // สร้าง token แบบสุ่ม
        const token = crypto.randomBytes(32).toString('hex');
        
        // บันทึก token ลงใน Redis
        await redisClient.set(
            `${SETUP_TOKEN_PREFIX}${token}`,
            'valid',
            {
                EX: TOKEN_EXPIRY // หมดอายุใน 10 นาที
            }
        );
        
        logger.info('Setup token generated successfully');
        
        res.json({
            token,
            expiresIn: TOKEN_EXPIRY
        });
    } catch (error) {
        logger.error('Error generating setup token:', error);
        res.status(500).json({
            error: 'Failed to generate setup token'
        });
    }
};

const validateToken = async (req, res, next) => {
    try {
        const { token } = req.body;

        if (!token) {
            logger.warn('Setup token validation failed: No token provided');
            return res.status(400).json({
                error: 'Setup token is required'
            });
        }

        // ตรวจสอบ token จาก Redis
        const isValid = await redisClient.get(`${SETUP_TOKEN_PREFIX}${token}`);

        if (!isValid) {
            logger.warn('Invalid or expired setup token used');
            return res.status(401).json({
                error: 'Invalid or expired setup token'
            });
        }

        // ลบ token หลังจากใช้งาน
        await redisClient.del(`${SETUP_TOKEN_PREFIX}${token}`);

        logger.info('Setup token validated successfully');
        next();
    } catch (error) {
        logger.error('Error validating setup token:', error);
        res.status(500).json({
            error: 'Failed to validate setup token'
        });
    }
};

module.exports = {
    generateSetupToken,
    validateToken
}; 