const { generateCarCode } = require('../../models/carCode');

// Controller สำหรับสร้างรหัสรถยนต์
async function getCarCode(req, res) {
    try {
        const { vehicleType = 'CAR' } = req.query;
        const currentDate = new Date();
        const year = parseInt(req.query.year) || currentDate.getFullYear();
        const month = parseInt(req.query.month) || currentDate.getMonth() + 1;

        // Validate input
        if (isNaN(year) || isNaN(month) || 
            month < 1 || month > 12 || 
            year < 2024 ||
            !['CAR', 'MOTORCYCLE'].includes(vehicleType)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid input parameters'
            });
        }

        const result = await generateCarCode(vehicleType);
        res.json(result);

    } catch (error) {
        console.error('Error in getCarCode:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to generate code',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

module.exports = {
    getCarCode
}; 