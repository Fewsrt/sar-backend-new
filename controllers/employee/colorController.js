const { createColor, findColorById, updateColorById, deleteColorById, findAllColors } = require('../../models/color.js');

// Controller สำหรับสร้างสีรถใหม่ (Create)
async function addColor(req, res) {
    try {
        const newColor = await createColor(req.body);
        res.status(201).json(newColor);
    } catch (error) {
        console.error('Error creating color:', error);
        res.status(500).json({ error: 'Failed to create color' });
    }
}

// Controller สำหรับค้นหาสีรถ (Read)
async function getColor(req, res) {
    try {
        const color = await findColorById(parseInt(req.params.color_id));
        if (!color) {
            return res.status(404).json({ error: 'Color not found' });
        }
        res.json(color);
    } catch (error) {
        console.error('Error fetching color:', error);
        res.status(500).json({ error: 'Failed to fetch color' });
    }
}

// Controller สำหรับอัพเดทสีรถ (Update)
async function updateColor(req, res) {
    try {
        const updatedColor = await updateColorById(parseInt(req.params.color_id), req.body);
        res.json(updatedColor);
    } catch (error) {
        console.error('Error updating color:', error);
        res.status(500).json({ error: 'Failed to update color' });
    }
}

// Controller สำหรับลบสีรถ (Delete)
async function deleteColor(req, res) {
    try {
        await deleteColorById(parseInt(req.params.color_id));
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting color:', error);
        res.status(500).json({ error: 'Failed to delete color' });
    }
}

// Controller สำหรับดึงข้อมูลสีทั้งหมด
async function getAllColors(req, res) {
    try {
        const colors = await findAllColors();
        res.json(colors);
    } catch (error) {
        console.error('Error fetching colors:', error);
        res.status(500).json({ error: 'Failed to fetch colors' });
    }
}

module.exports = { addColor, getColor, updateColor, deleteColor, getAllColors }; 