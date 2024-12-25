const os = require('os');
const onlineStatusService = require('../services/onlineStatusService');
const io = require('../app').io; // นำเข้า io จาก app.js

const serverStatusController = {
    getSystemStatus: (req, res) => {
        const uptime = process.uptime();
        const memoryUsage = process.memoryUsage();
        const cpuUsage = os.cpus();

        const status = {
            status: 'OK',
            uptime: `${Math.floor(uptime / 60)} minutes`,
            memoryUsage: {
                total: memoryUsage.rss,
                used: memoryUsage.heapUsed,
                free: memoryUsage.heapTotal - memoryUsage.heapUsed
            },
            cpu: cpuUsage.map(cpu => ({
                model: cpu.model,
                speed: cpu.speed,
                times: cpu.times
            })),
            timestamp: new Date().toISOString()
        };

        // ส่งข้อมูลสถานะเซิร์ฟเวอร์ไปยังทุกผู้ใช้ที่เชื่อมต่อ
        io.emit('serverStatus', status);

        res.json(status);
    }
};

module.exports = serverStatusController; 