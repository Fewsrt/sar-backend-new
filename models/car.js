const prisma = require('../config/db');

// Existing functions
const {
    createCar,
    findCarById,
    updateCarById,
    deleteCarById,
    findAllCars,
    findCarsByMonth,
    findCarsByYear,
    removeCarsByMonth,
    removeCarsByYear,
    getStatistics,
    findCarByCode,
    permanentDeleteCarById,
} = require('./existing-car-functions');  // แยกฟังก์ชันเดิมไปไว้อีกไฟล์

// Financial functions
async function updateFinancialDetails(car_id, data) {
    const existingDetails = await prisma.carFinancialDetails.findFirst({
        where: {
            car_id: car_id,
            deleted_at: null
        }
    });

    if (existingDetails) {
        return await prisma.carFinancialDetails.update({
            where: { id: existingDetails.id },
            data: data
        });
    } else {
        return await prisma.carFinancialDetails.create({
            data: { car_id, ...data }
        });
    }
}

async function getFinancialDetails(car_id) {
    return await prisma.carFinancialDetails.findFirst({
        where: {
            car_id: car_id,
            deleted_at: null
        }
    });
}

async function addExpense(car_id, data) {
    return await prisma.carExpense.create({
        data: {
            car_id,
            ...data
        },
        include: {
            category: true
        }
    });
}

async function getExpenses(car_id) {
    return await prisma.carExpense.findMany({
        where: { 
            car_id,
            deleted_at: null
        },
        include: {
            category: true
        },
        orderBy: {
            created_at: 'desc'
        }
    });
}

async function updateExpense(expense_id, data) {
    return await prisma.carExpense.update({
        where: { id: expense_id },
        data: {
            ...data,
            updated_at: new Date()
        },
        include: {
            category: true
        }
    });
}

async function deleteExpense(expense_id) {
    return await prisma.carExpense.update({
        where: { id: expense_id },
        data: { 
            deleted_at: new Date()
        }
    });
}

// Document functions
async function updateDocuments(car_id, data) {
    const existingDoc = await prisma.carDocumentTracking.findFirst({
        where: {
            car_id: car_id,
            deleted_at: null
        }
    });

    if (existingDoc) {
        return await prisma.carDocumentTracking.update({
            where: { id: existingDoc.id },
            data: { ...data, updated_at: new Date() }
        });
    } else {
        return await prisma.carDocumentTracking.create({
            data: { car_id, ...data }
        });
    }
}

async function getDocuments(car_id) {
    return await prisma.carDocumentTracking.findMany({
        where: {
            car_id: car_id,
            deleted_at: null
        }
    });
}

async function trackDocument(car_id, document_id) {
    return await prisma.carDocumentTracking.findFirst({
        where: { car_id, id: document_id }
    });
}

async function updateDocumentStatus(car_id, document_id, status, notes) {
    return await prisma.carDocumentTracking.update({
        where: { id: document_id, car_id },
        data: { status, notes, updated_at: new Date() }
    });
}

// Location functions
async function updateLocation(car_id, data) {
    const existingLocation = await prisma.carLocationDetails.findFirst({
        where: {
            car_id: car_id,
            deleted_at: null
        }
    });

    if (existingLocation) {
        return await prisma.carLocationDetails.update({
            where: { id: existingLocation.id },
            data: { ...data, updated_at: new Date() }
        });
    } else {
        return await prisma.carLocationDetails.create({
            data: { car_id, ...data }
        });
    }
}

async function getLocation(car_id) {
    return await prisma.carLocationDetails.findFirst({
        where: {
            car_id: car_id,
            deleted_at: null
        }
    });
}

async function updateParkingStatus(car_id, parking_id, status) {
    return await prisma.carLocationDetails.update({
        where: { car_id },
        data: { 
            parking_id,
            parking_status: status,
            updated_at: new Date()
        }
    });
}

// Inspection functions
async function createInspection(car_id, data) {
    return await prisma.carInspection.create({
        data: { ...data, car_id }
    });
}

async function getInspections(car_id, options = {}) {
    const { page = 1, limit = 10, status, startDate, endDate } = options;
    
    const where = {
        car_id,
        ...(status && { status }),
        ...(startDate && endDate && {
            inspection_date: {
                gte: new Date(startDate),
                lte: new Date(endDate)
            }
        })
    };

    return await prisma.carInspection.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { inspection_date: 'desc' }
    });
}

async function updateInspection(car_id, inspection_id, data) {
    return await prisma.carInspection.update({
        where: { id: inspection_id, car_id },
        data: { ...data, updated_at: new Date() }
    });
}

async function deleteInspection(car_id, inspection_id) {
    return await prisma.carInspection.update({
        where: { id: inspection_id, car_id },
        data: { deleted_at: new Date() }
    });
}

// เพิ่มฟังก์ชันสำหรับ Approval Details
async function updateApprovalDetails(car_id, data) {
    const existingApproval = await prisma.carApprovalDetails.findFirst({
        where: {
            car_id: car_id,
            deleted_at: null
        }
    });

    if (existingApproval) {
        return await prisma.carApprovalDetails.update({
            where: { id: existingApproval.id },
            data: { ...data, updated_at: new Date() }
        });
    } else {
        return await prisma.carApprovalDetails.create({
            data: { car_id, ...data }
        });
    }
}

async function getApprovalDetails(car_id) {
    return await prisma.carApprovalDetails.findFirst({
        where: {
            car_id: car_id,
            deleted_at: null
        }
    });
}

// เพิ่มฟังก์ชันสำหรับ Tax Details
async function updateTaxDetails(car_id, data) {
    const existingTax = await prisma.carTaxDetails.findFirst({
        where: {
            car_id: car_id,
            deleted_at: null
        }
    });

    if (existingTax) {
        return await prisma.carTaxDetails.update({
            where: { id: existingTax.id },
            data: { ...data, updated_at: new Date() }
        });
    } else {
        return await prisma.carTaxDetails.create({
            data: { car_id, ...data }
        });
    }
}

async function getTaxDetails(car_id) {
    return await prisma.carTaxDetails.findFirst({
        where: {
            car_id: car_id,
            deleted_at: null
        },
        include: {
            purchase_tax_invoices: true,
            withholding_tax_invoices: true,
            sale_tax_invoices: true
        }
    });
}

// เพิ่มฟังก์ชันสำหรับ Associated Entities
async function updateAssociatedEntities(car_id, data) {
    const existingEntities = await prisma.carAssociatedEntities.findFirst({
        where: {
            car_id: car_id,
            deleted_at: null
        }
    });

    if (existingEntities) {
        return await prisma.carAssociatedEntities.update({
            where: { id: existingEntities.id },
            data: { ...data, updated_at: new Date() }
        });
    } else {
        return await prisma.carAssociatedEntities.create({
            data: { car_id, ...data }
        });
    }
}

async function getAssociatedEntities(car_id) {
    return await prisma.carAssociatedEntities.findFirst({
        where: {
            car_id: car_id,
            deleted_at: null
        },
        include: {
            purchase_from: true,
            customer: true,
            salesperson: true
        }
    });
}

// เพิ่มฟังก์ชันสำหรับ General Info
async function updateGeneralInfo(car_id, data) {
    const existingInfo = await prisma.carGeneralInfo.findFirst({
        where: {
            car_id: car_id,
            deleted_at: null
        }
    });

    if (existingInfo) {
        return await prisma.carGeneralInfo.update({
            where: { id: existingInfo.id },
            data: { ...data, updated_at: new Date() }
        });
    } else {
        return await prisma.carGeneralInfo.create({
            data: { car_id, ...data }
        });
    }
}

async function getGeneralInfo(car_id) {
    return await prisma.carGeneralInfo.findFirst({
        where: {
            car_id: car_id,
            deleted_at: null
        }
    });
}

module.exports = {
    // Existing exports
    createCar,
    findCarById,
    updateCarById,
    deleteCarById,
    findAllCars,
    findCarsByMonth,
    findCarsByYear,
    removeCarsByMonth,
    removeCarsByYear,
    getStatistics,
    findCarByCode,
    permanentDeleteCarById,
    // New financial exports
    updateFinancialDetails,
    getFinancialDetails,
    addExpense,
    getExpenses,
    updateExpense,
    deleteExpense,

    // New document exports
    updateDocuments,
    getDocuments,
    trackDocument,
    updateDocumentStatus,

    // New location exports
    updateLocation,
    getLocation,
    updateParkingStatus,

    // New inspection exports
    createInspection,
    getInspections,
    updateInspection,
    deleteInspection,

    // New approval exports
    updateApprovalDetails,
    getApprovalDetails,

    // New tax exports
    updateTaxDetails,
    getTaxDetails,

    // New associated entities exports
    updateAssociatedEntities,
    getAssociatedEntities,

    // New general info exports
    updateGeneralInfo,
    getGeneralInfo
};
