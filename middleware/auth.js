const jwt = require('jsonwebtoken');
const prisma = require('../config/db');
const { AppError } = require('./errorHandler');

// Verify JWT token
const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            throw new AppError('No token provided', 401);
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Get fresh admin data
        const admin = await prisma.admin.findUnique({
            where: { id: decoded.id },
            select: {
                id: true,
                username: true,
                name: true,
                email: true,
                role: true,
                status: true,
                company_id: true
            }
        });

        if (!admin) {
            throw new AppError('User not found', 401);
        }

        if (!admin.status) {
            throw new AppError('Account is disabled', 403);
        }

        req.user = admin;
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            next(new AppError('Invalid token', 401));
        } else if (error.name === 'TokenExpiredError') {
            next(new AppError('Token expired', 401));
        } else {
            next(error);
        }
    }
};

// Check if user is Super Admin
const isSuperAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== 'super_admin') {
        throw new AppError('Access denied. Super Admin privileges required.', 403);
    }
    next();
};

// Check if user is Admin or Super Admin
const isAdmin = (req, res, next) => {
    if (!req.user || !['admin', 'super_admin'].includes(req.user.role)) {
        throw new AppError('Access denied. Admin privileges required.', 403);
    }
    next();
};

module.exports = {
    authenticateToken,
    isSuperAdmin,
    isAdmin
}; 