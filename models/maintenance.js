const prisma = require('../config/db');

// Get all maintenance records
const getAllMaintenance = async () => {
    return await prisma.maintenance.findMany({
        include: {
            car: true,
            employee: true,
        },
    });
};

// Get maintenance by ID
const getMaintenanceById = async (maintenanceId) => {
    return await prisma.maintenance.findUnique({
        where: { maintenance_id: parseInt(maintenanceId) },
        include: {
            car: true,
            employee: true,
        },
    });
};

// Get maintenance records by car ID
const getMaintenanceByCarId = async (carId) => {
    return await prisma.maintenance.findMany({
        where: { car_id: parseInt(carId) },
        include: {
            car: true,
            employee: true,
        },
    });
};

// Create maintenance record
const createMaintenance = async ({ 
    car_id, 
    maintenance_date, 
    description, 
    cost, 
    employee_id, 
    maintenance_status,
    before_repair_image_link,
    after_repair_image_link 
}) => {
    return await prisma.maintenance.create({
        data: {
            car_id: parseInt(car_id),
            maintenance_date: new Date(maintenance_date),
            description,
            cost: cost ? parseFloat(cost) : null,
            employee_id: parseInt(employee_id),
            maintenance_status,
            before_repair_image_link,
            after_repair_image_link
        },
    });
};

// Update maintenance record
const updateMaintenance = async (maintenanceId, {
    maintenance_date,
    description,
    cost,
    maintenance_status,
    before_repair_image_link,
    after_repair_image_link
}) => {
    return await prisma.maintenance.update({
        where: { maintenance_id: parseInt(maintenanceId) },
        data: {
            maintenance_date: maintenance_date ? new Date(maintenance_date) : undefined,
            description,
            cost: cost ? parseFloat(cost) : undefined,
            maintenance_status,
            before_repair_image_link,
            after_repair_image_link
        },
    });
};

// Delete maintenance record
const deleteMaintenance = async (maintenanceId) => {
    return await prisma.maintenance.delete({
        where: { maintenance_id: parseInt(maintenanceId) },
    });
};

module.exports = {
    getAllMaintenance,
    getMaintenanceById,
    getMaintenanceByCarId,
    createMaintenance,
    updateMaintenance,
    deleteMaintenance,
}; 