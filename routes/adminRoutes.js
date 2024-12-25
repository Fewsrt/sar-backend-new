// const express = require('express');
// const { createNewEmployee, updateUserRole } = require('../controllers/employeeController');
// const authenticateToken = require('../middleware/authenticateToken');
// const authorize = require('../middleware/roleMiddleware'); // Middleware สำหรับตรวจสอบบทบาท
// const router = express.Router();

// // เฉพาะ Admin ที่สามารถสร้างพนักงานใหม่ได้
// router.post('/create-employee', authenticateToken, authorize(['ADMIN']), createNewEmployee);

// // เฉพาะ Admin ที่สามารถอัปเดตบทบาทพนักงานได้
// router.patch('/update-role/:email', authenticateToken, authorize(['ADMIN']), updateUserRole);

// module.exports = router;
