const { updateLocation, getLocation, updateParkingStatus } = require('../../models/car');

// อัพเดทข้อมูลสถานที่
async function updateCarLocation(req, res) {
    try {
        const { car_id } = req.params;
        const locationData = req.body;
        
        const updatedLocation = await updateLocation(parseInt(car_id), locationData);
        
        res.json({
            success: true,
            data: updatedLocation
        });
    } catch (error) {
        console.error('Error updating location:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update location',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

// ดึงข้อมูลสถานที่
async function getCarLocation(req, res) {
    try {
        const { car_id } = req.params;
        const location = await getLocation(parseInt(car_id));
        
        if (!location) {
            return res.status(404).json({
                success: false,
                error: 'Location not found'
            });
        }

        res.json({
            success: true,
            data: location
        });
    } catch (error) {
        console.error('Error fetching location:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch location',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

// อัพเดทสถานะที่จอด
async function updateCarParkingStatus(req, res) {
    try {
        const { car_id } = req.params;
        const { parking_id, status } = req.body;
        
        const updatedParking = await updateParkingStatus(
            parseInt(car_id),
            parseInt(parking_id),
            status
        );
        
        res.json({
            success: true,
            data: updatedParking
        });
    } catch (error) {
        console.error('Error updating parking status:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update parking status',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

module.exports = {
    updateCarLocation,
    getCarLocation,
    updateCarParkingStatus
}; 