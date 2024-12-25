const saleModel = require('../../models/sale');

// Get all sales
const getAllSales = async (req, res) => {
    try {
        const sales = await saleModel.getAllSales();
        res.json(sales);
    } catch (error) {
        console.error('Error in getAllSales:', error);
        res.status(500).json({ error: 'Unable to fetch sales records' });
    }
};

// Get sale by ID
const getSaleById = async (req, res) => {
    const { saleId } = req.params;
    try {
        const sale = await saleModel.getSaleById(saleId);
        if (!sale) {
            return res.status(404).json({ error: 'Sale not found' });
        }
        res.json(sale);
    } catch (error) {
        console.error('Error in getSaleById:', error);
        res.status(500).json({ error: 'Unable to fetch sale' });
    }
};

// Get sales by customer ID
const getSalesByCustomerId = async (req, res) => {
    const { customerId } = req.params;
    try {
        const sales = await saleModel.getSalesByCustomerId(customerId);
        if (!sales || sales.length === 0) {
            return res.status(404).json({ error: 'No sales found for this customer' });
        }
        res.json(sales);
    } catch (error) {
        console.error('Error in getSalesByCustomerId:', error);
        res.status(500).json({ error: 'Unable to fetch customer sales' });
    }
};

// Get sales by salesperson ID
const getSalesBySalespersonId = async (req, res) => {
    const { salespersonId } = req.params;
    try {
        const sales = await saleModel.getSalesBySalespersonId(salespersonId);
        if (!sales || sales.length === 0) {
            return res.status(404).json({ error: 'No sales found for this salesperson' });
        }
        res.json(sales);
    } catch (error) {
        console.error('Error in getSalesBySalespersonId:', error);
        res.status(500).json({ error: 'Unable to fetch salesperson sales' });
    }
};

// Get sales by branch ID
const getSalesByBranchId = async (req, res) => {
    const { branchId } = req.params;
    try {
        const sales = await saleModel.getSalesByBranchId(branchId);
        if (!sales || sales.length === 0) {
            return res.status(404).json({ error: 'No sales found for this branch' });
        }
        res.json(sales);
    } catch (error) {
        console.error('Error in getSalesByBranchId:', error);
        res.status(500).json({ error: 'Unable to fetch branch sales' });
    }
};

// Create sale
const createSale = async (req, res) => {
    const {
        car_id,
        customer_id,
        sale_date,
        sale_price,
        salesperson_id,
        branchBranch_id
    } = req.body;

    try {
        const newSale = await saleModel.createSale({
            car_id,
            customer_id,
            sale_date,
            sale_price,
            salesperson_id,
            branchBranch_id
        });
        res.status(201).json(newSale);
    } catch (error) {
        console.error('Error in createSale:', error);
        res.status(500).json({ error: 'Unable to create sale' });
    }
};

// Update sale
const updateSale = async (req, res) => {
    const { saleId } = req.params;
    const {
        sale_date,
        sale_price,
        branchBranch_id
    } = req.body;

    try {
        const updatedSale = await saleModel.updateSale(
            saleId,
            {
                sale_date,
                sale_price,
                branchBranch_id
            }
        );
        res.json(updatedSale);
    } catch (error) {
        console.error('Error in updateSale:', error);
        res.status(500).json({ error: 'Unable to update sale' });
    }
};

// Delete sale
const deleteSale = async (req, res) => {
    const { saleId } = req.params;
    try {
        await saleModel.deleteSale(saleId);
        res.json({ message: 'Sale deleted successfully' });
    } catch (error) {
        console.error('Error in deleteSale:', error);
        res.status(500).json({ error: 'Unable to delete sale' });
    }
};

module.exports = {
    getAllSales,
    getSaleById,
    getSalesByCustomerId,
    getSalesBySalespersonId,
    getSalesByBranchId,
    createSale,
    updateSale,
    deleteSale,
}; 