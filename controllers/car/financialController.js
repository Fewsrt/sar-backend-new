const { updateFinancialDetails, getFinancialDetails, addExpense, getExpenses } = require('../../models/car');

// อัพเดทข้อมูลการเงิน
async function updateFinancial(req, res) {
    try {
        const { car_id } = req.params;
        const financialData = req.body;
        
        const updatedFinancial = await updateFinancialDetails(parseInt(car_id), financialData);
        
        res.json({
            success: true,
            data: updatedFinancial
        });
    } catch (error) {
        console.error('Error updating financial details:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update financial details',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

// ดึงข้อมูลการเงิน
async function getFinancial(req, res) {
    try {
        const { car_id } = req.params;
        const financial = await getFinancialDetails(parseInt(car_id));
        
        if (!financial) {
            return res.status(404).json({
                success: false,
                error: 'Financial details not found'
            });
        }

        res.json({
            success: true,
            data: financial
        });
    } catch (error) {
        console.error('Error fetching financial details:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch financial details',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

// เพิ่มค่าใช้จ่าย
async function addExpenseRecord(req, res) {
    try {
        const { car_id } = req.params;
        const expenseData = req.body;
        
        const newExpense = await addExpense(parseInt(car_id), expenseData);
        
        res.status(201).json({
            success: true,
            data: newExpense
        });
    } catch (error) {
        console.error('Error adding expense:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to add expense',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

// ดึงข้อมูลค่าใช้จ่าย
async function getExpenseRecords(req, res) {
    try {
        const { car_id } = req.params;
        const expenses = await getExpenses(parseInt(car_id));
        
        res.json({
            success: true,
            data: expenses
        });
    } catch (error) {
        console.error('Error fetching expenses:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch expenses',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

module.exports = {
    updateFinancial,
    getFinancial,
    addExpenseRecord,
    getExpenseRecords
}; 