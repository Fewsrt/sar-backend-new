const bankEmployeeModel = require('../../models/bankEmployee');

// Get all bank employees
const getAllBankEmployees = async (req, res) => {
    try {
        const bankEmployees = await bankEmployeeModel.getAllBankEmployees();
        res.json(bankEmployees);
    } catch (error) {
        console.error('Error in getAllBankEmployees:', error);
        res.status(500).json({ error: 'Unable to fetch bank employees' });
    }
};

// Get bank employee by ID
const getBankEmployeeById = async (req, res) => {
    const { bankEmployeeId } = req.params;
    try {
        const bankEmployee = await bankEmployeeModel.getBankEmployeeById(bankEmployeeId);
        if (!bankEmployee) {
            return res.status(404).json({ error: 'Bank employee not found' });
        }
        res.json(bankEmployee);
    } catch (error) {
        console.error('Error in getBankEmployeeById:', error);
        res.status(500).json({ error: 'Unable to fetch bank employee' });
    }
};

// Create bank employee
const createBankEmployee = async (req, res) => {
    const {
        bank_name,
        employee_name,
        phone,
        email,
        position,
        note
    } = req.body;

    try {
        // Check if email or phone already exists
        const existingEmail = await bankEmployeeModel.getBankEmployeeByEmail(email);
        if (existingEmail) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        const existingPhone = await bankEmployeeModel.getBankEmployeeByPhone(phone);
        if (existingPhone) {
            return res.status(400).json({ error: 'Phone number already exists' });
        }

        const newBankEmployee = await bankEmployeeModel.createBankEmployee({
            bank_name,
            employee_name,
            phone,
            email,
            position,
            note
        });
        res.status(201).json(newBankEmployee);
    } catch (error) {
        console.error('Error in createBankEmployee:', error);
        res.status(500).json({ error: 'Unable to create bank employee' });
    }
};

// Update bank employee
const updateBankEmployee = async (req, res) => {
    const { bankEmployeeId } = req.params;
    const {
        bank_name,
        employee_name,
        phone,
        email,
        position,
        note
    } = req.body;

    try {
        // Check if email or phone already exists for other employees
        const existingEmail = await bankEmployeeModel.getBankEmployeeByEmail(email);
        if (existingEmail && existingEmail.bank_employee_id !== parseInt(bankEmployeeId)) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        const existingPhone = await bankEmployeeModel.getBankEmployeeByPhone(phone);
        if (existingPhone && existingPhone.bank_employee_id !== parseInt(bankEmployeeId)) {
            return res.status(400).json({ error: 'Phone number already exists' });
        }

        const updatedBankEmployee = await bankEmployeeModel.updateBankEmployee(
            bankEmployeeId,
            {
                bank_name,
                employee_name,
                phone,
                email,
                position,
                note
            }
        );
        res.json(updatedBankEmployee);
    } catch (error) {
        console.error('Error in updateBankEmployee:', error);
        res.status(500).json({ error: 'Unable to update bank employee' });
    }
};

// Delete bank employee
const deleteBankEmployee = async (req, res) => {
    const { bankEmployeeId } = req.params;
    try {
        await bankEmployeeModel.deleteBankEmployee(bankEmployeeId);
        res.json({ message: 'Bank employee deleted successfully' });
    } catch (error) {
        console.error('Error in deleteBankEmployee:', error);
        res.status(500).json({ error: 'Unable to delete bank employee' });
    }
};

module.exports = {
    getAllBankEmployees,
    getBankEmployeeById,
    createBankEmployee,
    updateBankEmployee,
    deleteBankEmployee,
}; 