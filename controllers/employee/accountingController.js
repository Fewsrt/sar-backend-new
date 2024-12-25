const accountingModel = require('../../models/accounting');

// Get all accounting records
const getAllAccounting = async (req, res) => {
    try {
        const accountingRecords = await accountingModel.getAllAccounting();
        res.json(accountingRecords);
    } catch (error) {
        console.error('Error in getAllAccounting:', error);
        res.status(500).json({ error: 'Unable to fetch accounting records' });
    }
};

// Get accounting by ID
const getAccountingById = async (req, res) => {
    const { accountingId } = req.params;
    try {
        const accounting = await accountingModel.getAccountingById(accountingId);
        if (!accounting) {
            return res.status(404).json({ error: 'Accounting record not found' });
        }
        res.json(accounting);
    } catch (error) {
        console.error('Error in getAccountingById:', error);
        res.status(500).json({ error: 'Unable to fetch accounting record' });
    }
};

// Get accounting records by branch ID
const getAccountingByBranchId = async (req, res) => {
    const { branchId } = req.params;
    try {
        const accountingRecords = await accountingModel.getAccountingByBranchId(branchId);
        if (!accountingRecords || accountingRecords.length === 0) {
            return res.status(404).json({ error: 'No accounting records found for this branch' });
        }
        res.json(accountingRecords);
    } catch (error) {
        console.error('Error in getAccountingByBranchId:', error);
        res.status(500).json({ error: 'Unable to fetch branch accounting records' });
    }
};

// Get accounting records by car ID
const getAccountingByCarId = async (req, res) => {
    const { carId } = req.params;
    try {
        const accountingRecords = await accountingModel.getAccountingByCarId(carId);
        if (!accountingRecords || accountingRecords.length === 0) {
            return res.status(404).json({ error: 'No accounting records found for this car' });
        }
        res.json(accountingRecords);
    } catch (error) {
        console.error('Error in getAccountingByCarId:', error);
        res.status(500).json({ error: 'Unable to fetch car accounting records' });
    }
};

// Create accounting record
const createAccounting = async (req, res) => {
    const {
        transaction_type,
        amount,
        transaction_date,
        description,
        car_id,
        branch_id
    } = req.body;

    try {
        const newAccounting = await accountingModel.createAccounting({
            transaction_type,
            amount,
            transaction_date,
            description,
            car_id,
            branch_id
        });
        res.status(201).json(newAccounting);
    } catch (error) {
        console.error('Error in createAccounting:', error);
        res.status(500).json({ error: 'Unable to create accounting record' });
    }
};

// Update accounting record
const updateAccounting = async (req, res) => {
    const { accountingId } = req.params;
    const {
        transaction_type,
        amount,
        transaction_date,
        description,
        car_id,
        branch_id
    } = req.body;

    try {
        const updatedAccounting = await accountingModel.updateAccounting(
            accountingId,
            {
                transaction_type,
                amount,
                transaction_date,
                description,
                car_id,
                branch_id
            }
        );
        res.json(updatedAccounting);
    } catch (error) {
        console.error('Error in updateAccounting:', error);
        res.status(500).json({ error: 'Unable to update accounting record' });
    }
};

// Delete accounting record
const deleteAccounting = async (req, res) => {
    const { accountingId } = req.params;
    try {
        await accountingModel.deleteAccounting(accountingId);
        res.json({ message: 'Accounting record deleted successfully' });
    } catch (error) {
        console.error('Error in deleteAccounting:', error);
        res.status(500).json({ error: 'Unable to delete accounting record' });
    }
};

module.exports = {
    getAllAccounting,
    getAccountingById,
    getAccountingByBranchId,
    getAccountingByCarId,
    createAccounting,
    updateAccounting,
    deleteAccounting,
}; 