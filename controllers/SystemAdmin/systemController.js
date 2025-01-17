const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const prisma = require('../../config/db');
const { AppError } = require('../../middleware/errorHandler');
const { generateAccessToken, generateRefreshToken } = require('../employee/tokenController');
const { storeRefreshToken } = require('../../models/userModel');
const onlineStatusService = require('../../services/onlineStatusService');

const authController = {
    // Login
    login: async (req, res) => {
        const { username, password } = req.body;

        try {
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

            // Generate tokens แบบเดียวกับ authController
            const [accessToken, refreshToken] = await Promise.all([
                generateAccessToken({
                    admin_id: admin.id,
                    username: admin.username,
                    full_name: admin.name,
                    position: 'super_admin',
                    role: admin.role
                }),
                generateRefreshToken({
                    admin_id: admin.id
                })
            ]);

            // Store refresh token
            await storeRefreshToken(null, admin.id, refreshToken);

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
                accessToken,
                refreshToken,
                admin: {
                    admin_id: admin.id,
                    username: admin.username,
                    full_name: admin.name,
                    position: 'super_admin',
                    role: admin.role
                }
            });

        } catch (error) {
            console.error('Login error:', error);
            throw new AppError(error.message || 'Internal server error', error.statusCode || 500);
        }
    },

    // Logout
    logout: async (req, res) => {
        try {
            // ลบ refresh token
            await prisma.refreshToken.delete({
                where: {
                    admin_id: req.user.admin_id
                }
            });

            // Mark user as offline
            await onlineStatusService.markUserOffline(req.user.admin_id);

            // Log logout action
            await prisma.systemLog.create({
                data: {
                    level: 'info',
                    type: 'auth',
                    user_id: req.user.admin_id,
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
        } catch (error) {
            console.error('Logout error:', error);
            throw new AppError('Failed to logout', 500);
        }
    },

    // Refresh Token
    refreshToken: async (req, res) => {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            throw new AppError('Refresh token is required', 400);
        }

        try {
            const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
            
            // Get stored refresh token
            const storedToken = await prisma.refreshToken.findFirst({
                where: {
                    admin_id: decoded.admin_id,
                    token: refreshToken
                }
            });

            if (!storedToken) {
                throw new AppError('Invalid refresh token', 401);
            }

            const admin = await prisma.admin.findUnique({
                where: { id: decoded.admin_id }
            });

            if (!admin || !admin.status) {
                throw new AppError('Invalid token or account disabled', 401);
            }

            // Generate new access token
            const accessToken = generateAccessToken({
                admin_id: admin.id,
                username: admin.username,
                full_name: admin.name,
                position: 'super_admin',
                role: admin.role
            });

            res.json({
                success: true,
                accessToken,
                admin: {
                    admin_id: admin.id,
                    username: admin.username,
                    full_name: admin.name,
                    position: 'super_admin',
                    role: admin.role
                }
            });
        } catch (error) {
            console.error('Token refresh error:', error);
            throw new AppError('Invalid refresh token', 401);
        }
    }
};

module.exports = authController;