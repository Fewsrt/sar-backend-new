const setupService = require('../../services/setupService');
const { AppError } = require('../../middleware/errorHandler');

const setupController = {
    // ตรวจสอบสถานะการ setup
    checkSetupStatus: async (req, res) => {
        const hasSuperAdmin = await setupService.checkSuperAdmin();
        res.json({
            isInitialized: hasSuperAdmin,
            setupRequired: !hasSuperAdmin
        });
    },

    // สร้าง Super Admin คนแรก
    initializeSystem: async (req, res) => {
        const { username, password, name, email } = req.body;

        if (!username || !password || !name || !email) {
            throw new AppError('All fields are required', 400);
        }

        const superAdmin = await setupService.createFirstSuperAdmin({
            username,
            password,
            name,
            email,
            ip: req.ip
        });

        // ลบ password ก่อนส่งกลับ
        delete superAdmin.password;

        res.status(201).json({
            message: 'System initialized successfully',
            admin: superAdmin
        });
    }
};

module.exports = setupController; 