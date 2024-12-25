const jwt = require('jsonwebtoken');

const authorizeRoles = (...roles) => {
    return (req, res, next) => {
      if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized. Please log in.' });
      }
  
      // ตรวจสอบว่าบทบาทของผู้ใช้เป็นหนึ่งในบทบาทที่กำหนดไว้หรือไม่
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Access denied. You do not have the required role.' });
      }
  
      next();
    };
  };

module.exports = authorizeRoles;
