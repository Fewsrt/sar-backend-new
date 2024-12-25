const bankTransferTrackingModel = require('../../models/bankTransferTracking');

// Get all transfer trackings
const getAllTransferTrackings = async (req, res) => {
    try {
        const trackings = await bankTransferTrackingModel.getAllTransferTrackings();
        res.json(trackings);
    } catch (error) {
        console.error('Error in getAllTransferTrackings:', error);
        res.status(500).json({ error: 'Unable to fetch transfer trackings' });
    }
};

// Get transfer tracking by ID
const getTransferTrackingById = async (req, res) => {
    const { trackingId } = req.params;
    try {
        const tracking = await bankTransferTrackingModel.getTransferTrackingById(trackingId);
        if (!tracking) {
            return res.status(404).json({ error: 'Transfer tracking not found' });
        }
        res.json(tracking);
    } catch (error) {
        console.error('Error in getTransferTrackingById:', error);
        res.status(500).json({ error: 'Unable to fetch transfer tracking' });
    }
};

// Get transfer trackings by car ID
const getTransferTrackingsByCarId = async (req, res) => {
    const { carId } = req.params;
    try {
        const trackings = await bankTransferTrackingModel.getTransferTrackingsByCarId(carId);
        if (!trackings || trackings.length === 0) {
            return res.status(404).json({ error: 'No transfer trackings found for this car' });
        }
        res.json(trackings);
    } catch (error) {
        console.error('Error in getTransferTrackingsByCarId:', error);
        res.status(500).json({ error: 'Unable to fetch car transfer trackings' });
    }
};

// Get transfer trackings by bank employee ID
const getTransferTrackingsByBankEmployeeId = async (req, res) => {
    const { bankEmployeeId } = req.params;
    try {
        const trackings = await bankTransferTrackingModel.getTransferTrackingsByBankEmployeeId(bankEmployeeId);
        if (!trackings || trackings.length === 0) {
            return res.status(404).json({ error: 'No transfer trackings found for this bank employee' });
        }
        res.json(trackings);
    } catch (error) {
        console.error('Error in getTransferTrackingsByBankEmployeeId:', error);
        res.status(500).json({ error: 'Unable to fetch bank employee transfer trackings' });
    }
};

// Create transfer tracking
const createTransferTracking = async (req, res) => {
    const {
        car_id,
        follow_up_number,
        follow_up_date,
        bank_employee_id,
        follow_up_note
    } = req.body;

    try {
        const newTracking = await bankTransferTrackingModel.createTransferTracking({
            car_id,
            follow_up_number,
            follow_up_date,
            bank_employee_id,
            follow_up_note
        });
        res.status(201).json(newTracking);
    } catch (error) {
        console.error('Error in createTransferTracking:', error);
        res.status(500).json({ error: 'Unable to create transfer tracking' });
    }
};

// Update transfer tracking
const updateTransferTracking = async (req, res) => {
    const { trackingId } = req.params;
    const {
        follow_up_number,
        follow_up_date,
        bank_employee_id,
        follow_up_note
    } = req.body;

    try {
        const updatedTracking = await bankTransferTrackingModel.updateTransferTracking(
            trackingId,
            {
                follow_up_number,
                follow_up_date,
                bank_employee_id,
                follow_up_note
            }
        );
        res.json(updatedTracking);
    } catch (error) {
        console.error('Error in updateTransferTracking:', error);
        res.status(500).json({ error: 'Unable to update transfer tracking' });
    }
};

// Delete transfer tracking
const deleteTransferTracking = async (req, res) => {
    const { trackingId } = req.params;
    try {
        await bankTransferTrackingModel.deleteTransferTracking(trackingId);
        res.json({ message: 'Transfer tracking deleted successfully' });
    } catch (error) {
        console.error('Error in deleteTransferTracking:', error);
        res.status(500).json({ error: 'Unable to delete transfer tracking' });
    }
};

module.exports = {
    getAllTransferTrackings,
    getTransferTrackingById,
    getTransferTrackingsByCarId,
    getTransferTrackingsByBankEmployeeId,
    createTransferTracking,
    updateTransferTracking,
    deleteTransferTracking,
}; 