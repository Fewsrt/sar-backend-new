const prisma = require('../config/db.js');

// ฟังก์ชันสำหรับสร้างข้อมูลรถใหม่ (Create)
async function createCar(data) {
    const {
        brand_id,
        model_id,
        submodel_id,
        color_id,
        parking_id,
        purchase_from_id,
        financing_id,
        sale_branch_id,
        branch_50_percent_id,
        salesperson_id,
        customer_id,
        ...otherData
    } = data;

    return await prisma.car.create({
        data: {
            ...otherData,
            car_brand: brand_id ? {
                connect: { brand_id: brand_id }
            } : undefined,
            car_model: model_id ? {
                connect: { model_id: model_id }
            } : undefined,
            car_submodel: submodel_id ? {
                connect: { submodel_id: submodel_id }
            } : undefined,
            color: color_id ? {
                connect: { color_id: color_id }
            } : undefined,
            parking_location: parking_id ? {
                connect: { branch_id: parking_id }
            } : undefined,
            purchase_from: purchase_from_id ? {
                connect: { supplier_id: purchase_from_id }
            } : undefined,
            financing: financing_id ? {
                connect: { customer_id: financing_id }
            } : undefined,
            sale_branch: sale_branch_id ? {
                connect: { branch_id: sale_branch_id }
            } : undefined,
            branch_50_percent: branch_50_percent_id ? {
                connect: { branch_id: branch_50_percent_id }
            } : undefined,
            salesperson: salesperson_id ? {
                connect: { employee_id: salesperson_id }
            } : undefined,
            customer: customer_id ? {
                connect: { customer_id: customer_id }
            } : undefined
        }
    });
}

// ฟังก์ชันสำหรับค้นหาข้อมูลรถจาก ID (Read)
async function findCarById(car_id) {
    return await prisma.car.findUnique({
        where: { car_id },
        include: {
            car_brand: true,
            car_model: true,
            car_submodel: true,
            color: true,
            parking_location: true,
            purchaseTaxInvoice: true,
            withholding_tax_invoice: true,
            sale_tax_invoice: true,
            purchase_from: true,
            financing: true,
            sale_branch: true,
            branch_50_percent: true,
            salesperson: true,
            customer: true,
            reservation: true,
            sale: true,
            carInspection: true,
            maintenance: true,
            accounting: true,
            customerPurchaseHistory: true,
            bankTransferTracking: true
        },
    });
}

// ฟังก์ชันสำหรับอัพเดทข้อมูลรถ (Update)
async function updateCarById(car_id, data) {
    return await prisma.car.update({
        where: { car_id },
        data,
    });
}

// ฟังก์ชันสำหรับลบข้อมูลรถ (Delete)
async function deleteCarById(car_id) {
    return await prisma.car.delete({
        where: { car_id },
    });
}

// ค้นหารถตามเดือน
async function findCarsByMonth(year, month) {
    return await prisma.car.findMany({
        where: {
            year: year,
            month: month
        },
        include: {
            car_brand: true,
            car_model: true,
            car_submodel: true
        },
        orderBy: {
            car_code: 'asc'
        }
    });
}

// ค้นหารถตามปี
async function findCarsByYear(year) {
    return await prisma.car.findMany({
        where: {
            year: year
        },
        include: {
            car_brand: true,
            car_model: true,
            car_submodel: true
        },
        orderBy: {
            month: 'asc'
        }
    });
}

// ลบรถตามเดือน
async function removeCarsByMonth(year, month) {
    return await prisma.car.deleteMany({
        where: {
            year: year,
            month: month
        }
    });
}

// ลบรถตามปี
async function removeCarsByYear(year) {
    return await prisma.car.deleteMany({
        where: {
            year: year
        }
    });
}

// ดึงสถิติรถ
async function getStatistics() {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    const [
        totalCars,
        thisYearCars,
        thisMonthCars,
        carsByStatus
    ] = await Promise.all([
        // จำนวนรถทั้งหมด
        prisma.car.count(),
        
        // จำนวนรถปีนี้
        prisma.car.count({
            where: { year: currentYear }
        }),
        
        // จำนวนรถเดือนนี้
        prisma.car.count({
            where: {
                year: currentYear,
                month: currentMonth
            }
        }),
        
        // จำนวนรถแยกตามสถานะ
        prisma.car.groupBy({
            by: ['status'],
            _count: true
        })
    ]);

    return {
        total: totalCars,
        thisYear: thisYearCars,
        thisMonth: thisMonthCars,
        byStatus: carsByStatus
    };
}

// ฟังก์ชันสำหรับดึงข้อมูลทั้งหมด
async function findAllCars({ page, limit, search, status, sortBy, sortOrder }) {
    const skip = (page - 1) * limit;

    const where = {
        AND: [
            {
                OR: search ? [
                    { car_code: { contains: search, mode: 'insensitive' } },
                    { registration_no: { contains: search, mode: 'insensitive' } },
                    { license_plate_no: { contains: search, mode: 'insensitive' } }
                ] : undefined
            },
            status ? { status: status } : undefined
        ].filter(Boolean)
    };

    const [cars, total] = await Promise.all([
        prisma.car.findMany({
            skip,
            take: limit,
            where,
            include: {
                car_brand: true,
                car_model: true,
                car_submodel: true,
                color: true,
                parking_location: true,
                purchaseTaxInvoice: true,
                withholding_tax_invoice: true,
                sale_tax_invoice: true,
                purchase_from: true,
                financing: true,
                sale_branch: true,
                branch_50_percent: true,
                salesperson: true,
                customer: true,
                reservation: true,
                sale: true,
                carInspection: true,
                maintenance: true,
                accounting: true,
                customerPurchaseHistory: true,
                bankTransferTracking: true
            },
            orderBy: {
                [sortBy]: sortOrder
            }
        }),
        prisma.car.count({ where })
    ]);

    return {
        data: cars,
        pagination: {
            total,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            limit,
            hasNext: page < Math.ceil(total / limit),
            hasPrev: page > 1
        }
    };
}

// ฟังก์ชันสำหรับค้นหารถด้วย car_code
async function findCarByCode(car_code) {
    return await prisma.car.findFirst({
        where: { car_code },
        include: {
            car_brand: true,
            car_model: true,
            car_submodel: true,
            color: true,
            parking_location: true,
            purchaseTaxInvoice: true,
            withholding_tax_invoice: true,
            sale_tax_invoice: true,
            purchase_from: true,
            financing: true,
            sale_branch: true,
            branch_50_percent: true,
            salesperson: true,
            customer: true,
            reservation: true,
            sale: true,
            carInspection: true,
            maintenance: true,
            accounting: true,
            customerPurchaseHistory: true,
            bankTransferTracking: true
        }
    });
}

module.exports = { 
    createCar, 
    findCarById, 
    updateCarById, 
    deleteCarById,
    findCarsByMonth,
    findCarsByYear,
    removeCarsByMonth,
    removeCarsByYear,
    getStatistics,
    findAllCars,
    findCarByCode 
};