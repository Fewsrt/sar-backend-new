const customerModel = require('../../models/customer');

// Get list of customers
const getCustomers = async (req, res) => {
    try {
        const customers = await customerModel.getCustomers();
        res.json(customers);
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch customers' });
    }
};

// Get customer by ID
const getCustomerById = async (req, res) => {
    const { customerId } = req.params;
    try {
        const customer = await customerModel.getCustomerById(customerId);
        if (!customer) {
            res.status(404).json({ error: 'Customer not found' });
        } else {
            res.json(customer);
        }
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch customer' });
    }
};

// Create a new customer
const createCustomer = async (req, res) => {
    const { name, branch, phone, email, address, subdistrict_id, district_id, province_id, postal_code, tax_id, customer_code } = req.body;
    try {
        const newCustomer = await customerModel.createCustomer({
            name,
            branch,
            phone,
            email,
            address,
            subdistrict_id,
            district_id,
            province_id,
            postal_code,
            tax_id,
            customer_code
        });
        res.status(201).json(newCustomer);
    } catch (error) {
        console.error('Error creating customer:', error);
        res.status(500).json({ error: 'Unable to create customer' });
    }
};

// Update customer by ID
const updateCustomer = async (req, res) => {
    const { customerId } = req.params;
    const { name, branch, phone, email, address, subdistrict_id, district_id, province_id, postal_code, tax_id, customer_code } = req.body;
    try {
        const updatedCustomer = await customerModel.updateCustomer(customerId, {
            name,
            branch,
            phone,
            email,
            address,
            subdistrict_id,
            district_id,
            province_id,
            postal_code,
            tax_id,
            customer_code
        });
        res.json(updatedCustomer);
    } catch (error) {
        res.status(500).json({ error: 'Unable to update customer' });
    }
};

// Delete customer by ID
const deleteCustomer = async (req, res) => {
    const { customerId } = req.params;
    try {
        await customerModel.deleteCustomer(customerId);
        res.status(200).json({ message: 'Customer deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Unable to delete customer' });
    }
};

// สร้างฟังก์ชันเพื่อสร้างรหัสลูกค้า C ใหม่
const getNewCustomerCodeC = async (req, res) => {
    try {
        // ค้นหาล่าสุดของรหัสลูกค้า C ในฐานข้อมูล
        const lastCustomerCode = await customerModel.getLastCustomerCodeC(); // ฟังก์ชันนี้ต้องสร้างใน models/customer.js
        let newCodeNumber = 1;

        if (lastCustomerCode) {
            // แยกหมายเลขจากรหัสลูกค้า C ล่าสุด
            const lastNumber = parseInt(lastCustomerCode.slice(1), 10);
            newCodeNumber = lastNumber + 1; // เพิ่มหมายเลข
        }

        const newCustomerCode = `C${String(newCodeNumber).padStart(3, '0')}`; // สร้างรหัสลูกค้าใหม่
        res.json({ customerCode: newCustomerCode });
    } catch (error) {
        res.status(500).json({ error: 'Unable to create customer code' });
    }
};

module.exports = {
    getCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer,
    getNewCustomerCodeC,
}; 