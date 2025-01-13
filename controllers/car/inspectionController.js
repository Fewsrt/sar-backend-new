const { createInspection, getInspections, updateInspection, deleteInspection } = require('../../models/car');

// สร้างรายการตรวจสอบใหม่
async function addInspection(req, res) {
    try {
        const { car_id } = req.params;
        const inspectionData = req.body;
        
        const newInspection = await createInspection(parseInt(car_id), inspectionData);
        
        res.status(201).json({
            success: true,
            data: newInspection
        });
    } catch (error) {
        console.error('Error creating inspection:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to create inspection',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

// ดึงข้อมูลการตรวจสอบทั้งหมด
async function getCarInspections(req, res) {
    try {
        const { car_id } = req.params;
        const { 
            page = 1, 
            limit = 10, 
            status,
            startDate,
            endDate 
        } = req.query;
        
        const inspections = await getInspections(parseInt(car_id), {
            page: parseInt(page),
            limit: parseInt(limit),
            status,
            startDate,
            endDate
        });
        
        res.json({
            success: true,
            data: inspections
        });
    } catch (error) {
        console.error('Error fetching inspections:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch inspections',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

// อัพเดทข้อมูลการตรวจสอบ
async function updateCarInspection(req, res) {
    try {
        const { car_id, inspection_id } = req.params;
        const inspectionData = req.body;
        
        const updatedInspection = await updateInspection(
            parseInt(car_id),
            parseInt(inspection_id),
            inspectionData
        );
        
        if (!updatedInspection) {
            return res.status(404).json({
                success: false,
                error: 'Inspection not found'
            });
        }
        
        res.json({
            success: true,
            data: updatedInspection
        });
    } catch (error) {
        console.error('Error updating inspection:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update inspection',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

// ลบข้อมูลการตรวจสอบ
async function deleteCarInspection(req, res) {
    try {
        const { car_id, inspection_id } = req.params;
        
        await deleteInspection(parseInt(car_id), parseInt(inspection_id));
        
        res.json({
            success: true,
            message: 'Inspection deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting inspection:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to delete inspection',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

module.exports = {
    addInspection,
    getCarInspections,
    updateCarInspection,
    deleteCarInspection
}; 