// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const checkApiKey = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Token is required' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token' });
        }
        req.user = user; // เก็บข้อมูลพนักงานจาก token ไว้ใน req.user
        next();
    });
};

module.exports = checkApiKey;
