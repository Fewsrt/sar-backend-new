const onlineStatusService = require('../../services/onlineStatusService');

const onlineStatusController = {
    // Get all online users
    getAllOnlineUsers: async (req, res) => {
        const onlineUsers = await onlineStatusService.getAllOnlineUsers();
        res.json(onlineUsers);
    },

    // Get online admins
    getOnlineAdmins: async (req, res) => {
        const onlineAdmins = await onlineStatusService.getOnlineUsers('admin');
        res.json(onlineAdmins);
    },

    // Get online employees
    getOnlineEmployees: async (req, res) => {
        const onlineEmployees = await onlineStatusService.getOnlineUsers('employee');
        res.json(onlineEmployees);
    },

    // Get online count by type
    getOnlineCount: async (req, res) => {
        const { admins, employees, totalCount } = await onlineStatusService.getAllOnlineUsers();
        res.json({
            adminCount: admins.length,
            employeeCount: employees.length,
            totalCount
        });
    }
};

module.exports = onlineStatusController;