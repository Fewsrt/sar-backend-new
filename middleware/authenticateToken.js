const jwt = require('jsonwebtoken');
const prisma = require('../config/db');
const { AppError } = require('../middleware/errorHandler');

const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized. Please log in.' });
        }

        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Token expired or invalid. Please log in again.' });
            }

            // Get fresh data from database
            const employee = await prisma.employee.findUnique({
                where: { employee_id: decoded.employee_id }
            });

            if (!employee) {
                throw new AppError('Employee not found', 401);
            }

            req.user = employee;
            next();
        });
    } catch (error) {
        next(error);
    }
};

module.exports = authenticateToken;
