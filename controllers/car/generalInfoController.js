const { updateGeneralInfo, getGeneralInfo } = require('../../models/car');

// ดึงข้อมูลทั่วไป
async function getCarInfo(req, res) {
    try {
        const { car_id } = req.params;
        const info = await getGeneralInfo(parseInt(car_id));
        
        res.json({
            success: true,
            data: info
        });
    } catch (error) {
        console.error('Error getting info:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to get general info',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

// อัพเดทข้อมูลทั่วไป
async function updateCarInfo(req, res) {
    try {
        const { car_id } = req.params;
        const infoData = req.body;
        
        const updatedInfo = await updateGeneralInfo(parseInt(car_id), infoData);
        
        res.json({
            success: true,
            data: updatedInfo
        });
    } catch (error) {
        console.error('Error updating info:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update general info',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

module.exports = {
    getCarInfo,
    updateCarInfo
}; 