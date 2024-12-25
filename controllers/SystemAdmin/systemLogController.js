const prisma = require('../../config/db');
const { AppError } = require('../../middleware/errorHandler');
// const ExcelJS = require('exceljs');

const systemLogController = {
    // Get all logs with pagination and filters
    getLogs: async (req, res) => {
        const { 
            page = 1, 
            limit = 10, 
            level, 
            type,
            startDate,
            endDate 
        } = req.query;

        const where = {};
        if (level) where.level = level;
        if (type) where.type = type;
        if (startDate || endDate) {
            where.timestamp = {};
            if (startDate) where.timestamp.gte = new Date(startDate);
            if (endDate) where.timestamp.lte = new Date(endDate);
        }

        const [total, logs] = await prisma.$transaction([
            prisma.systemLog.count({ where }),
            prisma.systemLog.findMany({
                where,
                include: {
                    admin: {
                        select: {
                            username: true,
                            name: true
                        }
                    }
                },
                orderBy: { timestamp: 'desc' },
                skip: (page - 1) * limit,
                take: parseInt(limit)
            })
        ]);

        res.json({
            data: logs,
            pagination: {
                total,
                page: parseInt(page),
                totalPages: Math.ceil(total / limit)
            }
        });
    },

    // Export logs to Excel
    exportLogs: async (req, res) => {
        const { startDate, endDate, level, type } = req.query;

        const where = {};
        if (level) where.level = level;
        if (type) where.type = type;
        if (startDate || endDate) {
            where.timestamp = {};
            if (startDate) where.timestamp.gte = new Date(startDate);
            if (endDate) where.timestamp.lte = new Date(endDate);
        }

        const logs = await prisma.systemLog.findMany({
            where,
            include: {
                admin: {
                    select: {
                        username: true,
                        name: true
                    }
                }
            },
            orderBy: { timestamp: 'desc' }
        });

        // Create Excel workbook
        // const workbook = new ExcelJS.Workbook();
        // const worksheet = workbook.addWorksheet('System Logs');

        // worksheet.columns = [
        //     { header: 'Timestamp', key: 'timestamp', width: 20 },
        //     { header: 'Level', key: 'level', width: 10 },
        //     { header: 'Type', key: 'type', width: 15 },
        //     { header: 'User', key: 'user', width: 20 },
        //     { header: 'Action', key: 'action', width: 30 },
        //     { header: 'IP', key: 'ip', width: 15 },
        //     { header: 'Details', key: 'details', width: 50 }
        // ];

        logs.forEach(log => {
            worksheet.addRow({
                timestamp: log.timestamp,
                level: log.level,
                type: log.type,
                user: log.admin?.name || 'System',
                action: log.action,
                ip: log.ip,
                details: JSON.stringify(log.details)
            });
        });

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename=system_logs_${new Date().toISOString()}.xlsx`);

        await workbook.xlsx.write(res);
        res.end();
    },

    // Create new log entry
    createLog: async (req, res) => {
        const { level, type, action, details } = req.body;
        const user_id = req.user?.id;

        const log = await prisma.systemLog.create({
            data: {
                level,
                type,
                user_id,
                action,
                details,
                ip: req.ip,
                user_agent: req.headers['user-agent']
            }
        });

        res.status(201).json(log);
    }
};

module.exports = systemLogController; 