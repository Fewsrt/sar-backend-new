const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const prisma = require('../../config/db');
const { AppError } = require('../../middleware/errorHandler');
const { generateAccessToken, generateRefreshToken } = require('../employee/tokenController');
const onlineStatusService = require('../../services/onlineStatusService');
const io = require('../../app').io;

const authController = {
    // Login
    login: async (req, res) => {
        const { username, password } = req.body;

        // Find admin by username
        const admin = await prisma.admin.findUnique({
            where: { username }
        });

        if (!admin || !admin.status) {
            throw new AppError('Invalid credentials or account disabled', 401);
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(password, admin.password);
        if (!isValidPassword) {
            throw new AppError('Invalid credentials', 401);
        }

        // Generate tokens
        const accessToken = jwt.sign(
            {
                id: admin.id,
                role: admin.role
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        const refreshToken = jwt.sign(
            { id: admin.id },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN }
        );

        // Update last login
        await prisma.admin.update({
            where: { id: admin.id },
            data: { last_login: new Date() }
        });

        // Log login action
        await prisma.systemLog.create({
            data: {
                level: 'info',
                type: 'auth',
                user_id: admin.id,
                action: 'Login',
                details: {
                    username: admin.username,
                    timestamp: new Date()
                },
                ip: req.ip,
                user_agent: req.headers['user-agent']
            }
        });

        // Remove sensitive data
        delete admin.password;

        // Mark user as online after successful login
        await onlineStatusService.markUserOnline('admin', admin.id, {
            name: admin.name,
            role: admin.role
        });


        res.json({
            admin,
            accessToken,
            refreshToken
        });
    },

    // Logout
    logout: async (req, res) => {
        // Mark user as offline
        await onlineStatusService.markUserOffline(req.user.id);

        // Log logout action
        await prisma.systemLog.create({
            data: {
                level: 'info',
                type: 'auth',
                user_id: req.user.id,
                action: 'Logout',
                details: {
                    username: req.user.username,
                    timestamp: new Date()
                },
                ip: req.ip,
                user_agent: req.headers['user-agent']
            }
        });

        res.json({ message: 'Logged out successfully' });
    },

    // Refresh Token
    refreshToken: async (req, res) => {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            throw new AppError('Refresh token is required', 400);
        }

        try {
            const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
            
            const admin = await prisma.admin.findUnique({
                where: { id: decoded.id }
            });

            if (!admin || !admin.status) {
                throw new AppError('Invalid token or account disabled', 401);
            }

            const accessToken = jwt.sign(
                {
                    id: admin.id,
                    role: admin.role
                },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRES_IN }
            );

            res.json({ accessToken });
        } catch (error) {
            throw new AppError('Invalid refresh token', 401);
        }
    }
};

module.exports = authController;