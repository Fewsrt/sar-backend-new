const customerPurchaseHistoryModel = require('../../models/customerPurchaseHistory');

// Get all purchase histories
const getAllPurchaseHistories = async (req, res) => {
    try {
        const histories = await customerPurchaseHistoryModel.getAllPurchaseHistories();
        res.json(histories);
    } catch (error) {
        console.error('Error in getAllPurchaseHistories:', error);
        res.status(500).json({ error: 'Unable to fetch purchase histories' });
    }
};

// Get purchase history by ID
const getPurchaseHistoryById = async (req, res) => {
    const { historyId } = req.params;
    try {
        const history = await customerPurchaseHistoryModel.getPurchaseHistoryById(historyId);
        if (!history) {
            return res.status(404).json({ error: 'Purchase history not found' });
        }
        res.json(history);
    } catch (error) {
        console.error('Error in getPurchaseHistoryById:', error);
        res.status(500).json({ error: 'Unable to fetch purchase history' });
    }
};

// Get purchase histories by customer ID
const getPurchaseHistoriesByCustomerId = async (req, res) => {
    const { customerId } = req.params;
    try {
        const histories = await customerPurchaseHistoryModel.getPurchaseHistoriesByCustomerId(customerId);
        if (!histories || histories.length === 0) {
            return res.status(404).json({ error: 'No purchase histories found for this customer' });
        }
        res.json(histories);
    } catch (error) {
        console.error('Error in getPurchaseHistoriesByCustomerId:', error);
        res.status(500).json({ error: 'Unable to fetch customer purchase histories' });
    }
};

// Get purchase histories by car ID
const getPurchaseHistoriesByCarId = async (req, res) => {
    const { carId } = req.params;
    try {
        const histories = await customerPurchaseHistoryModel.getPurchaseHistoriesByCarId(carId);
        if (!histories || histories.length === 0) {
            return res.status(404).json({ error: 'No purchase histories found for this car' });
        }
        res.json(histories);
    } catch (error) {
        console.error('Error in getPurchaseHistoriesByCarId:', error);
        res.status(500).json({ error: 'Unable to fetch car purchase histories' });
    }
};

// Create purchase history
const createPurchaseHistory = async (req, res) => {
    const {
        customer_id,
        car_id,
        purchase_date,
        purchase_price
    } = req.body;

    try {
        const newHistory = await customerPurchaseHistoryModel.createPurchaseHistory({
            customer_id,
            car_id,
            purchase_date,
            purchase_price
        });
        res.status(201).json(newHistory);
    } catch (error) {
        console.error('Error in createPurchaseHistory:', error);
        res.status(500).json({ error: 'Unable to create purchase history' });
    }
};

// Update purchase history
const updatePurchaseHistory = async (req, res) => {
    const { historyId } = req.params;
    const {
        purchase_date,
        purchase_price
    } = req.body;

    try {
        const updatedHistory = await customerPurchaseHistoryModel.updatePurchaseHistory(
            historyId,
            {
                purchase_date,
                purchase_price
            }
        );
        res.json(updatedHistory);
    } catch (error) {
        console.error('Error in updatePurchaseHistory:', error);
        res.status(500).json({ error: 'Unable to update purchase history' });
    }
};

// Delete purchase history
const deletePurchaseHistory = async (req, res) => {
    const { historyId } = req.params;
    try {
        await customerPurchaseHistoryModel.deletePurchaseHistory(historyId);
        res.json({ message: 'Purchase history deleted successfully' });
    } catch (error) {
        console.error('Error in deletePurchaseHistory:', error);
        res.status(500).json({ error: 'Unable to delete purchase history' });
    }
};

module.exports = {
    getAllPurchaseHistories,
    getPurchaseHistoryById,
    getPurchaseHistoriesByCustomerId,
    getPurchaseHistoriesByCarId,
    createPurchaseHistory,
    updatePurchaseHistory,
    deletePurchaseHistory,
}; 