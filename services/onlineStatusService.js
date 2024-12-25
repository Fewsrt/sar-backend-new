const prisma = require('../config/db');
const redis = require('../config/redis');

const ADMIN_ONLINE_KEY = 'online_admins';
const EMPLOYEE_ONLINE_KEY = 'online_employees';
const USER_TTL = 5 * 60; // 5 minutes

const onlineStatusService = {
    // Mark user online based on type
    markUserOnline: async (userType, userId, userInfo) => {
        const key = userType === 'admin' ? ADMIN_ONLINE_KEY : EMPLOYEE_ONLINE_KEY;
        const userData = {
            userId,
            name: userInfo.name,
            role: userInfo.role,
            ...(userType === 'employee' && {
                employee_code: userInfo.employee_code,
                position: userInfo.position,
                branch_id: userInfo.branch_id
            }),
            lastActive: Date.now()
        };
        
        await redis.hSet(key, userId.toString(), JSON.stringify(userData));
        await redis.expire(key, USER_TTL);
    },

    // Update last active time
    updateLastActive: async (userType, userId) => {
        const key = userType === 'admin' ? ADMIN_ONLINE_KEY : EMPLOYEE_ONLINE_KEY;
        const userData = await redis.hGet(key, userId.toString());
        if (userData) {
            const parsed = JSON.parse(userData);
            parsed.lastActive = Date.now();
            await redis.hSet(key, userId.toString(), JSON.stringify(parsed));
            await redis.expire(key, USER_TTL);
        }
    },

    // Mark user offline
    markUserOffline: async (userType, userId) => {
        const key = userType === 'admin' ? ADMIN_ONLINE_KEY : EMPLOYEE_ONLINE_KEY;
        await redis.hDel(key, userId.toString());
    },

    // Get online users by type
    getOnlineUsers: async (userType) => {
        const key = userType === 'admin' ? ADMIN_ONLINE_KEY : EMPLOYEE_ONLINE_KEY;
        const now = Date.now();
        const onlineUsers = await redis.hGetAll(key);
        
        const activeUsers = Object.entries(onlineUsers)
            .map(([userId, data]) => {
                const userData = JSON.parse(data);
                const timeSinceLastActive = now - userData.lastActive;
                
                if (timeSinceLastActive > USER_TTL * 1000) {
                    redis.hDel(key, userId);
                    return null;
                }
                return userData;
            })
            .filter(user => user !== null);

        return activeUsers;
    },

    // Get all online users (both admin and employees)
    getAllOnlineUsers: async () => {
        const [onlineAdmins, onlineEmployees] = await Promise.all([
            onlineStatusService.getOnlineUsers('admin'),
            onlineStatusService.getOnlineUsers('employee')
        ]);

        return {
            admins: onlineAdmins,
            employees: onlineEmployees,
            totalCount: onlineAdmins.length + onlineEmployees.length
        };
    }
};

module.exports = onlineStatusService; 