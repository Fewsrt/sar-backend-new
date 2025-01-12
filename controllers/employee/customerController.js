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
        // แปลง customerId เป็น integer
        const id = parseInt(customerId);
        
        // เพิ่ม include เพื่อดึงข้อมูลที่เกี่ยวข้อง
        const customer = await customerModel.getCustomerById(id);
        
        // ตรวจสอบว่าพบข้อมูลหรือไม่
        if (!customer) {
            return res.status(404).json({ 
                error: 'Customer not found',
                message: `ไม่พบข้อมูลลูกค้ารหัส ${id}`
            });
        }

        res.json(customer);
        
    } catch (error) {
        res.status(500).json({ 
            error: 'Unable to fetch customer',
            message: 'เกิดข้อผิดพลาดในการดึงข้อมูลลูกค้า'
        });
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
    const updateData = req.body;
    
    try {
        // แปลง customerId เป็น integer
        const id = parseInt(customerId);

        // ตรวจสอบว่ามี customer อยู่หรือไม่
        const existingCustomer = await customerModel.getCustomerById(id);
        if (!existingCustomer) {
            return res.status(404).json({
                error: 'Customer not found',
                message: `ไม่พบข้อมูลลูกค้ารหัส ${id}`
            });
        }

        // อัพเดทข้อมูล
        const updatedCustomer = await customerModel.updateCustomer(id, updateData);
        
        res.json(updatedCustomer);

    } catch (error) {
        
        // จัดการ error กรณี unique constraint violation
        if (error.code === 'P2002') {
            return res.status(400).json({
                error: 'Duplicate value',
                message: `ค่า ${error.meta.target[0]} นี้มีอยู่ในระบบแล้ว`,
                field: error.meta.target[0]
            });
        }

        // จัดการ error กรณี foreign key constraint violation
        if (error.code === 'P2003') {
            return res.status(400).json({
                error: 'Invalid reference',
                message: 'ข้อมูลอ้างอิงไม่ถูกต้อง (เช่น subdistrict_id, district_id, province_id)',
                field: error.meta.field_name
            });
        }

        res.status(500).json({
            error: 'Unable to update customer',
            message: 'เกิดข้อผิดพลาดในการอัพเดทข้อมูลลูกค้า',
            details: error.message
        });
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