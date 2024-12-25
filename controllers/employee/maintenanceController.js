const maintenanceModel = require('../../models/maintenance');

// Get all maintenance records
const getAllMaintenance = async (req, res) => {
    try {
        const maintenanceRecords = await maintenanceModel.getAllMaintenance();
        res.json(maintenanceRecords);
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch maintenance records' });
    }
};

// Get maintenance by ID
const getMaintenanceById = async (req, res) => {
    const { maintenanceId } = req.params;
    try {
        const maintenance = await maintenanceModel.getMaintenanceById(maintenanceId);
        if (!maintenance) {
            res.status(404).json({ error: 'Maintenance record not found' });
        } else {
            res.json(maintenance);
        }
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch maintenance record' });
    }
};

// Get maintenance records by car ID
const getMaintenanceByCarId = async (req, res) => {
    const { carId } = req.params;
    try {
        const maintenanceRecords = await maintenanceModel.getMaintenanceByCarId(carId);
        if (!maintenanceRecords || maintenanceRecords.length === 0) {
            res.status(404).json({ error: 'No maintenance records found for this car' });
        } else {
            res.json(maintenanceRecords);
        }
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch maintenance records for car' });
    }
};

// Create maintenance record
const createMaintenance = async (req, res) => {
    const { 
        car_id, 
        maintenance_date, 
        description, 
        cost, 
        employee_id, 
        maintenance_status,
        before_repair_image_link,
        after_repair_image_link 
    } = req.body;
    
    try {
        const newMaintenance = await maintenanceModel.createMaintenance({
            car_id,
            maintenance_date,
            description,
            cost,
            employee_id,
            maintenance_status,
            before_repair_image_link,
            after_repair_image_link
        });
        res.status(201).json(newMaintenance);
    } catch (error) {
        res.status(500).json({ error: 'Unable to create maintenance record' });
    }
};

// Update maintenance record
const updateMaintenance = async (req, res) => {
    const { maintenanceId } = req.params;
    const {
        maintenance_date,
        description,
        cost,
        maintenance_status,
        before_repair_image_link,
        after_repair_image_link
    } = req.body;

    try {
        const updatedMaintenance = await maintenanceModel.updateMaintenance(maintenanceId, {
            maintenance_date,
            description,
            cost,
            maintenance_status,
            before_repair_image_link,
            after_repair_image_link
        });
        res.json(updatedMaintenance);
    } catch (error) {
        res.status(500).json({ error: 'Unable to update maintenance record' });
    }
};

// Delete maintenance record
const deleteMaintenance = async (req, res) => {
    const { maintenanceId } = req.params;
    try {
        await maintenanceModel.deleteMaintenance(maintenanceId);
        res.json({ message: 'Maintenance record deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Unable to delete maintenance record' });
    }
};

module.exports = {
    getAllMaintenance,
    getMaintenanceById,
    getMaintenanceByCarId,
    createMaintenance,
    updateMaintenance,
    deleteMaintenance,
}; 