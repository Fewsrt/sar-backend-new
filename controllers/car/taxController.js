const { updateTaxDetails, getTaxDetails } = require('../../models/car');

// ดึงข้อมูลภาษี
async function getCarTax(req, res) {
    try {
        const { car_id } = req.params;
        const tax = await getTaxDetails(parseInt(car_id));
        
        res.json({
            success: true,
            data: tax
        });
    } catch (error) {
        console.error('Error getting tax:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to get tax details',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

// อัพเดทข้อมูลภาษี
async function updateCarTax(req, res) {
    try {
        const { car_id } = req.params;
        const taxData = req.body;
        
        const updatedTax = await updateTaxDetails(parseInt(car_id), taxData);
        
        res.json({
            success: true,
            data: updatedTax
        });
    } catch (error) {
        console.error('Error updating tax:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update tax details',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

module.exports = {
    getCarTax,
    updateCarTax
}; 