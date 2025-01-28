const {
    createFloorplanFinancing,
    getAllFloorplanFinancing,
    getFloorplanFinancingById,
    updateFloorplanFinancing,
    deleteFloorplanFinancing
} = require('../models/floorplanFinancing');

// Create
async function create(req, res) {
    try {
        const newFloorplan = await createFloorplanFinancing(req.body);
        res.status(201).json({
            success: true,
            data: newFloorplan
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
}

// Read (All)
async function getAll(req, res) {
    try {
        const floorplans = await getAllFloorplanFinancing();
        res.json({
            success: true,
            data: floorplans
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}

// Read (Single)
async function getById(req, res) {
    try {
        const floorplan = await getFloorplanFinancingById(req.params.id);
        if (!floorplan) {
            return res.status(404).json({
                success: false,
                error: 'Floorplan financing not found'
            });
        }
        res.json({
            success: true,
            data: floorplan
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}

// Update
async function update(req, res) {
    try {
        const floorplan = await updateFloorplanFinancing(req.params.id, req.body);
        res.json({
            success: true,
            data: floorplan
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
}

// Delete
async function remove(req, res) {
    try {
        await deleteFloorplanFinancing(req.params.id);
        res.json({
            success: true,
            message: 'Floorplan financing deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}

module.exports = {
    create,
    getAll,
    getById,
    update,
    remove
}; 