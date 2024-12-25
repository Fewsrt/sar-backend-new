const prisma = require('../config/db');
const bcrypt = require('bcryptjs');
const { AppError } = require('../middleware/errorHandler');

const setupService = {
    // ตรวจสอบว่ามี Super Admin อยู่แล้วหรือไม่
    checkSuperAdmin: async () => {
        const superAdmin = await prisma.admin.findFirst({
            where: { role: 'super_admin' }
        });
        return !!superAdmin;
    },

    createFirstSuperAdmin: async (adminData) => {
        const hasSuperAdmin = await setupService.checkSuperAdmin();

        if (hasSuperAdmin) {
            throw new AppError('Super Admin already exists', 400);
        }

        const hashedPassword = await bcrypt.hash(adminData.password, 10);

        const superAdmin = await prisma.admin.create({
            data: {
                username: adminData.username,
                password: hashedPassword,
                name: adminData.name,
                email: adminData.email,
                role: 'super_admin',
                status: true
            }
        });

        // Create initial system log
        await prisma.systemLog.create({
            data: {
                level: 'info',
                type: 'system_init',
                user_id: superAdmin.id,
                action: 'System Initialization',
                details: {
                    event: 'First Super Admin created',
                    timestamp: new Date()
                },
                ip: adminData.ip || 'system'
            }
        });

        // Create or update initial system settings
        const initialSettings = [
            {
                key: 'system_initialized',
                value: 'true',
                description: 'System initialization status'
            },
            {
                key: 'initialization_date',
                value: new Date().toISOString(),
                description: 'System initialization date'
            }
        ];

        // Use transaction to ensure all settings are created/updated
        await prisma.$transaction(
            initialSettings.map(setting =>
                prisma.systemSetting.upsert({
                    where: { key: setting.key },
                    update: {
                        value: setting.value,
                        description: setting.description
                    },
                    create: setting
                })
            )
        );

        return superAdmin;
    }
};

module.exports = setupService; 