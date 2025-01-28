const prisma = require('../config/db.js');

// Create
async function createFloorplanFinancing(data) {
    try {
        const newFloorplan = await prisma.floorplanfinancing.create({
            data: {
                name: data.name,
                amount: data.amount
            }
        });
        return newFloorplan;
    } catch (error) {
        console.error('Error creating floorplan financing:', error);
        throw error;
    }
}

// Read (All)
async function getAllFloorplanFinancing() {
    try {
        return await prisma.floorplanfinancing.findMany({
            orderBy: {
                created_at: 'desc'
            }
        });
    } catch (error) {
        console.error('Error getting floorplan financing:', error);
        throw error;
    }
}

// Read (Single)
async function getFloorplanFinancingById(id) {
    try {
        return await prisma.floorplanfinancing.findUnique({
            where: {
                id: parseInt(id)
            }
        });
    } catch (error) {
        console.error('Error getting floorplan financing:', error);
        throw error;
    }
}

// Update
async function updateFloorplanFinancing(id, data) {
    try {
        return await prisma.floorplanfinancing.update({
            where: {
                id: parseInt(id)
            },
            data: {
                name: data.name,
                amount: data.amount,
                updated_at: new Date()
            }
        });
    } catch (error) {
        console.error('Error updating floorplan financing:', error);
        throw error;
    }
}

// Delete
async function deleteFloorplanFinancing(id) {
    try {
        return await prisma.floorplanfinancing.delete({
            where: {
                id: parseInt(id)
            }
        });
    } catch (error) {
        console.error('Error deleting floorplan financing:', error);
        throw error;
    }
}

module.exports = {
    createFloorplanFinancing,
    getAllFloorplanFinancing,
    getFloorplanFinancingById,
    updateFloorplanFinancing,
    deleteFloorplanFinancing
}; 