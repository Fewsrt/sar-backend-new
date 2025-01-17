const { transferStatus } = require('@prisma/client');
const prisma = require('../config/db');

// Get list of customers
const getCustomers = async () => {
    return await prisma.customer.findMany({
        include: {
            subdistrict: {
                select: {
                    name_th: true,
                    name_en: true,
                    zip_code: true
                }
            },
            district: {
                select: {
                    name_th: true,
                    name_en: true
                }
            },
            province: {
                select: {
                    name_th: true,
                    name_en: true
                }
            },
            reservation: true,
            sale: true,
            followUp: true,
            carAssociatedEntities: true,
            customerPurchaseHistory: true,
            taxInvoice: true,
            financing: true
        }
    });
};

// Get customer by ID
const getCustomerById = async (customerId) => {
    return await prisma.customer.findUnique({
        where: { customer_id: customerId },
        include: {
            subdistrict: {
                select: {
                    name_th: true,
                    name_en: true,
                    zip_code: true
                }
            },
            district: {
                select: {
                    name_th: true,
                    name_en: true
                }
            },
            province: {
                select: {
                    name_th: true,
                    name_en: true
                }
            },
            reservation: true,
            sale: true,
            followUp: true,
            carAssociatedEntities: true,
            customerPurchaseHistory: true,
            taxInvoice: true,
            financing: true
        }
    });
};

// Create a new customer
const createCustomer = async ({ name, branch, phone, email, address, subdistrict_id, district_id, province_id, postal_code, tax_id, customer_code }) => {
    // ตรวจสอบว่า subdistrict, district และ province มีอยู่จริง
    const subdistrict = await prisma.subdistrict.findUnique({
        where: { id: subdistrict_id }
    });
    if (!subdistrict) throw new Error('Subdistrict not found');

    const district = await prisma.district.findUnique({
        where: { id: district_id }
    });
    if (!district) throw new Error('District not found');

    const province = await prisma.province.findUnique({
        where: { id: province_id }
    });
    if (!province) throw new Error('Province not found');

    // สร้าง customer
    return await prisma.customer.create({
        data: {
            name,
            branch,
            phone,
            email,
            address,
            postal_code,
            tax_id,
            customer_code,
            subdistrict: {
                connect: { id: subdistrict_id }
            },
            district: {
                connect: { id: district_id }
            },
            province: {
                connect: { id: province_id }
            }
        }
    });
};

// Update customer by ID
const updateCustomer = async (id, updateData) => {
    try {
        return await prisma.customer.update({
            where: {
                customer_id: id
            },
            data: updateData,
            include: {
                subdistrict: true,
                district: true,
                province: true
            }
        });
    } catch (error) {
        console.error('Error in updateCustomer model:', error);
        throw error; // ส่ง error ไปให้ controller จัดการ
    }
};

// Delete customer by ID
const deleteCustomer = async (customerId) => {
    return await prisma.customer.delete({
        where: { customer_id: customerId },
    });
};

// ฟังก์ชันค้นหารหัสลูกค้า C ล่าสุด
const getLastCustomerCodeC = async () => {
    try {
        const lastCustomer = await prisma.customer.findFirst({
            where: {
                customer_code: {
                    startsWith: 'C',
                    mode: 'insensitive' // ค้นหาทั้งตัวพิมพ์เล็กและใหญ่
                }
            },
            orderBy: {
                customer_code: 'desc'
            }
        });

        return lastCustomer?.customer_code || null;
    } catch (error) {
        console.error('Error in getLastCustomerCodeC:', error);
        throw error;
    }
};

module.exports = {
    getCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer,
    getLastCustomerCodeC,
};