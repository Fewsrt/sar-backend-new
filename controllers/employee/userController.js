const bcrypt = require('bcryptjs');
const prisma = require('../../config/db');

const changePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const employeeId = req.user.employee_id;

    try {
        // ตรวจสอบว่ามีพนักงานอยู่จริง
        const employee = await prisma.employee.findUnique({
            where: { employee_id: employeeId }
        });

        if (!employee) {
            return res.status(404).json({ 
                success: false,
                message: 'Employee not found' 
            });
        }

        // ตรวจสอบรหัสผ่านปัจจุบัน
        const isPasswordValid = await bcrypt.compare(currentPassword, employee.password);
        if (!isPasswordValid) {
            return res.status(401).json({ 
                success: false,
                message: 'Current password is incorrect' 
            });
        }

        // ตรวจสอบว่ารหัสผ่านใหม่ไม่ซ้ำกับรหัสผ่านเดิม
        const isSamePassword = await bcrypt.compare(newPassword, employee.password);
        if (isSamePassword) {
            return res.status(400).json({ 
                success: false,
                message: 'New password must be different from current password' 
            });
        }

        // ตรวจสอบความซับซ้อนของรหัสผ่านใหม่
        const passwordValidation = validatePassword(newPassword);
        if (!passwordValidation.isValid) {
            return res.status(400).json({ 
                success: false,
                message: passwordValidation.message 
            });
        }

        // เข้ารหัสและบันทึกรหัสผ่านใหม่
        const hashedPassword = await bcrypt.hash(newPassword, 8);
        await prisma.employee.update({
            where: { employee_id: employeeId },
            data: { 
                password: hashedPassword,
                isFirstLogin: false
            }
        });

        res.json({ 
            success: true,
            message: 'Password changed successfully' 
        });

    } catch (error) {
        console.error('Change password error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Failed to change password',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// แยกฟังก์ชันตรวจสอบรหัสผ่าน
const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);

    if (password.length < minLength) {
        return {
            isValid: false,
            message: `Password must be at least ${minLength} characters long`
        };
    }

    if (!hasUpperCase) {
        return {
            isValid: false,
            message: 'Password must contain at least one uppercase letter'
        };
    }

    if (!hasLowerCase) {
        return {
            isValid: false,
            message: 'Password must contain at least one lowercase letter'
        };
    }

    if (!hasNumber) {
        return {
            isValid: false,
            message: 'Password must contain at least one number'
        };
    }

    return {
        isValid: true,
        message: 'Password is valid'
    };
};

module.exports = {
    changePassword
}; 