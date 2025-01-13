const { updateAssociatedEntities, getAssociatedEntities } = require('../../models/car');

// ดึงข้อมูลผู้เกี่ยวข้อง
async function getCarEntities(req, res) {
    try {
        const { car_id } = req.params;
        const entities = await getAssociatedEntities(parseInt(car_id));
        
        res.json({
            success: true,
            data: entities
        });
    } catch (error) {
        console.error('Error getting entities:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to get associated entities',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

// อัพเดทข้อมูลผู้เกี่ยวข้อง
async function updateCarEntities(req, res) {
    try {
        const { car_id } = req.params;
        const entitiesData = req.body;
        
        const updatedEntities = await updateAssociatedEntities(parseInt(car_id), entitiesData);
        
        res.json({
            success: true,
            data: updatedEntities
        });
    } catch (error) {
        console.error('Error updating entities:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update associated entities',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

module.exports = {
    getCarEntities,
    updateCarEntities
}; 