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

            let user;

            // ตรวจสอบว่าเป็น employee หรือ admin
            if (decoded.employee_id) {
                // ถ้าเป็น employee
                user = await prisma.employee.findUnique({
                    where: { employee_id: decoded.employee_id }
                });

                if (!user) {
                    throw new AppError('Employee not found', 401);
                }
            } else if (decoded.admin_id) {
                // ถ้าเป็น admin
                user = await prisma.admin.findUnique({
                    where: { id: decoded.admin_id }
                });

                if (!user) {
                    throw new AppError('Admin not found', 401);
                }
            } else {
                return res.status(403).json({ message: 'Invalid user type' });
            }

            req.user = user; // กำหนด user ใน req
            next();
        });
    } catch (error) {
        next(error);
    }
};

module.exports = authenticateToken;
