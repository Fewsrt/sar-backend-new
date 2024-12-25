const onlineStatusService = require('../services/onlineStatusService');

const onlineTracker = async (req, res, next) => {
    if (req.user) {
        // อัพเดทสถานะ online ทุกครั้งที่มีการเรียก API
        await onlineStatusService.updateLastActive(req.user.id);
    }
    next();
};

module.exports = onlineTracker; 