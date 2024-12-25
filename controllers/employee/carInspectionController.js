const carInspectionModel = require('../../models/carInspection');

// Get all inspections
const getAllInspections = async (req, res) => {
    try {
        const inspections = await carInspectionModel.getAllInspections();
        res.json(inspections);
    } catch (error) {
        console.error('Error in getAllInspections:', error);
        res.status(500).json({ error: 'Unable to fetch inspection records' });
    }
};

// Get inspection by ID
const getInspectionById = async (req, res) => {
    const { inspectionId } = req.params;
    try {
        const inspection = await carInspectionModel.getInspectionById(inspectionId);
        if (!inspection) {
            return res.status(404).json({ error: 'Inspection record not found' });
        }
        res.json(inspection);
    } catch (error) {
        console.error('Error in getInspectionById:', error);
        res.status(500).json({ error: 'Unable to fetch inspection record' });
    }
};

// Get inspections by car ID
const getInspectionsByCarId = async (req, res) => {
    const { carId } = req.params;
    try {
        const inspections = await carInspectionModel.getInspectionsByCarId(carId);
        if (!inspections || inspections.length === 0) {
            return res.status(404).json({ error: 'No inspection records found for this car' });
        }
        res.json(inspections);
    } catch (error) {
        console.error('Error in getInspectionsByCarId:', error);
        res.status(500).json({ error: 'Unable to fetch inspection records for car' });
    }
};

// Create inspection
const createInspection = async (req, res) => {
    const {
        car_id,
        inspection_date,
        inspector_id,
        inspection_notes,
        before_repair_image_link
    } = req.body;

    try {
        const newInspection = await carInspectionModel.createInspection({
            car_id,
            inspection_date,
            inspector_id,
            inspection_notes,
            before_repair_image_link
        });
        res.status(201).json(newInspection);
    } catch (error) {
        console.error('Error in createInspection:', error);
        res.status(500).json({ error: 'Unable to create inspection record' });
    }
};

// Update inspection
const updateInspection = async (req, res) => {
    const { inspectionId } = req.params;
    const {
        inspection_date,
        inspection_notes,
        before_repair_image_link
    } = req.body;

    try {
        const updatedInspection = await carInspectionModel.updateInspection(
            inspectionId,
            {
                inspection_date,
                inspection_notes,
                before_repair_image_link
            }
        );
        res.json(updatedInspection);
    } catch (error) {
        console.error('Error in updateInspection:', error);
        res.status(500).json({ error: 'Unable to update inspection record' });
    }
};

// Delete inspection
const deleteInspection = async (req, res) => {
    const { inspectionId } = req.params;
    try {
        await carInspectionModel.deleteInspection(inspectionId);
        res.json({ message: 'Inspection record deleted successfully' });
    } catch (error) {
        console.error('Error in deleteInspection:', error);
        res.status(500).json({ error: 'Unable to delete inspection record' });
    }
};

module.exports = {
    getAllInspections,
    getInspectionById,
    getInspectionsByCarId,
    createInspection,
    updateInspection,
    deleteInspection,
}; 