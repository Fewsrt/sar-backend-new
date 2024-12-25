const prisma = require('../../config/db');
const { AppError } = require('../../middleware/errorHandler');

const systemSettingController = {
    // Get all settings
    getSettings: async (req, res) => {
        const settings = await prisma.systemSetting.findMany({
            orderBy: { key: 'asc' }
        });
        res.json(settings);
    },

    // Update settings (bulk update)
    updateSettings: async (req, res) => {
        const { settings } = req.body;

        if (!Array.isArray(settings)) {
            throw new AppError('Settings must be an array', 400);
        }

        const updates = settings.map(setting => 
            prisma.systemSetting.upsert({
                where: { key: setting.key },
                update: {
                    value: setting.value,
                    description: setting.description
                },
                create: {
                    key: setting.key,
                    value: setting.value,
                    description: setting.description
                }
            })
        );

        await prisma.$transaction(updates);

        const updatedSettings = await prisma.systemSetting.findMany({
            orderBy: { key: 'asc' }
        });

        res.json(updatedSettings);
    },

    // Get setting by key
    getSetting: async (req, res) => {
        const { key } = req.params;

        const setting = await prisma.systemSetting.findUnique({
            where: { key }
        });

        if (!setting) {
            throw new AppError('Setting not found', 404);
        }

        res.json(setting);
    }
};

module.exports = systemSettingController; 