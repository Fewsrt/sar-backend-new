// controllers/employeeController.js
const employeeModel = require('../../models/employee');
const bcrypt = require('bcryptjs');

// Get list of employees
const getEmployees = async (req, res) => {
    try {
        const employees = await employeeModel.getEmployees();
        res.json(employees);
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch employees' });
    }
};

// Get employee by ID
const getEmployeeById = async (req, res) => {
    const { employeeId } = req.params;
    try {
        const employee = await employeeModel.getEmployeeById(employeeId);
        if (!employee) {
            res.status(404).json({ error: 'Employee not found' });
        } else {
            res.json(employee);
        }
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch employee' });
    }
};

// Create a new employee
const createEmployee = async (req, res) => {
    const { employee_code, title, full_name, nickname, position, branch_id, phone, email, profile_picture, employment_status = 'active', employee_card = 'yes', line_uuid, isFirstLogin, role } = req.body;
    try {
        const defaultPassword = 'Sarerp123';
        const hashedPassword = await bcrypt.hash(defaultPassword, 8);
        const newEmployee = await employeeModel.createEmployee({
            employee_code,
            title,
            full_name,
            nickname,
            position,
            branch_id,
            phone,
            email,
            password: hashedPassword,
            profile_picture,
            employment_status,
            employee_card,
            line_uuid,
            isFirstLogin,
            role,
        });
        res.status(201).json(newEmployee);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Unable to create employee' });
    }
};

// Update employee by ID
const updateEmployee = async (req, res) => {
    const { employeeId } = req.params;
    const data = req.body;
    try {
        // console.log('Employee ID received for update:', employeeId);
        // console.log('Data received for update:', data);

        const updatedEmployee = await employeeModel.updateEmployee(employeeId, data);

        if (!updatedEmployee) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        const { password, ...employeeData } = updatedEmployee;
        res.json(employeeData);
    } catch (error) {
        // console.error('Error during employee update:', error);
        res.status(500).json({ error: 'Unable to update employee' });
    }
};


// Update password and set isFirstLogin to false
const updatePassword = async (req, res) => {
    // console.log('Request received for password update:', req.body);
    const { email, newPassword } = req.body;
    try {
        const updatedEmployee = await employeeModel.updatePassword(email, newPassword);
        const { password, ...employeeData } = updatedEmployee;
        res.json(employeeData);
    } catch (error) {
        res.status(500).json({ error: 'Unable to update password' });
    }
};

// Update role of employee
const updateRole = async (req, res) => {
    const { email, newRole } = req.body;
    try {
        const updatedEmployee = await employeeModel.updateRole(email, newRole);
        const { password, ...employeeData } = updatedEmployee;
        res.json(employeeData);
    } catch (error) {
        res.status(500).json({ error: 'Unable to update role' });
    }
};

// Delete employee by ID
const deleteEmployee = async (req, res) => {
    const { employeeId } = req.params;
    try {
        // Check if employee exists
        const employee = await employeeModel.getEmployeeById(employeeId);
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        await employeeModel.deleteEmployee(employeeId);
        res.status(200).json({ 
            message: 'Employee and all related records deleted successfully',
            deletedEmployee: {
                employee_code: employee.employee_code,
                full_name: employee.full_name
            }
        });
    } catch (error) {
        console.error('Error deleting employee:', error);
        if (error.code === 'P2003') {
            res.status(400).json({ 
                error: 'Cannot delete employee because they have related records that cannot be automatically deleted' 
            });
        } else if (error.code === 'P2025') {
            res.status(404).json({ 
                error: 'Employee not found' 
            });
        } else {
            res.status(500).json({ 
                error: 'Unable to delete employee and related records',
                details: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    }
};

// Get last employee number by prefix
const getLastEmployeeNumber = async (req, res) => {
    const { prefix } = req.params;
    
    // Define valid prefixes
    const validPrefixes = [
        'SAM', 'SA', 'PCM', 'PC', 'PDM', 'PD',
        'ACM', 'AC', 'ADM', 'AD', 'TFM', 'TF',
        'MCM', 'MC', 'MA'
    ];

    // Validate prefix
    if (!validPrefixes.includes(prefix)) {
        return res.status(400).json({ 
            error: 'Invalid prefix. Must be one of: ' + validPrefixes.join(', ') 
        });
    }

    try {
        const lastNumber = await employeeModel.getLastEmployeeNumber(prefix);
        res.json({ employeeCode: lastNumber });
    } catch (error) {
        res.status(500).json({ error: 'Unable to generate employee code' });
    }
};

// Reset password
const resetPassword = async (req, res) => {
    const { employeeId } = req.params;
    try {
        // Check if employee exists
        const employee = await employeeModel.getEmployeeById(employeeId);
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        // Reset password
        const updatedEmployee = await employeeModel.resetPassword(employeeId);
        
        // Remove sensitive data from response
        const { password, ...employeeData } = updatedEmployee;
        
        res.json({ 
            message: 'Password has been reset successfully',
            employee: employeeData
        });
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ 
            error: 'Unable to reset password',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Reset LINE UUID
const resetLineUUID = async (req, res) => {
    const { employeeId } = req.params;
    try {
        // Check if employee exists
        const employee = await employeeModel.getEmployeeById(employeeId);
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        // Reset LINE UUID
        const updatedEmployee = await employeeModel.resetLineUUID(employeeId);
        
        // Remove sensitive data from response
        const { password, ...employeeData } = updatedEmployee;
        
        res.json({ 
            message: 'LINE UUID has been reset successfully',
            employee: employeeData
        });
    } catch (error) {
        console.error('Error resetting LINE UUID:', error);
        res.status(500).json({ 
            error: 'Unable to reset LINE UUID',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

module.exports = {
    getEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    updatePassword,
    updateRole,
    deleteEmployee,
    getLastEmployeeNumber,
    resetPassword,
    resetLineUUID
};
