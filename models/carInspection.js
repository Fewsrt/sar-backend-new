const prisma = require('../config/db');
// Get all inspections
const getAllInspections = async () => {
    return await prisma.carInspection.findMany({
        include: {
            car: true,
            employee: true,
        },
    });
};

// Get inspection by ID
const getInspectionById = async (inspectionId) => {
    return await prisma.carInspection.findUnique({
        where: { inspection_id: parseInt(inspectionId) },
        include: {
            car: true,
            employee: true,
        },
    });
};

// Get inspections by car ID
const getInspectionsByCarId = async (carId) => {
    return await prisma.carInspection.findMany({
        where: { car_id: parseInt(carId) },
        include: {
            car: true,
            employee: true,
        },
    });
};

// Create inspection
const createInspection = async ({
    car_id,
    inspection_date,
    inspector_id,
    inspection_notes,
    before_repair_image_link
}) => {
    return await prisma.carInspection.create({
        data: {
            car_id: parseInt(car_id),
            inspection_date: new Date(inspection_date),
            inspector_id: parseInt(inspector_id),
            inspection_notes,
            before_repair_image_link
        },
        include: {
            car: true,
            employee: true,
        },
    });
};

// Update inspection
const updateInspection = async (inspectionId, {
    inspection_date,
    inspection_notes,
    before_repair_image_link
}) => {
    return await prisma.carInspection.update({
        where: { inspection_id: parseInt(inspectionId) },
        data: {
            inspection_date: inspection_date ? new Date(inspection_date) : undefined,
            inspection_notes,
            before_repair_image_link
        },
        include: {
            car: true,
            employee: true,
        },
    });
};

// Delete inspection
const deleteInspection = async (inspectionId) => {
    return await prisma.carInspection.delete({
        where: { inspection_id: parseInt(inspectionId) },
    });
};

module.exports = {
    getAllInspections,
    getInspectionById,
    getInspectionsByCarId,
    createInspection,
    updateInspection,
    deleteInspection,
}; 