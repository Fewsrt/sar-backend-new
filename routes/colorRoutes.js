const express = require('express');
const { 
    addColor, 
    getColor, 
    updateColor, 
    deleteColor, 
    getAllColors 
} = require('../controllers/employee/colorController.js');

const router = express.Router();

// CRUD สำหรับสีรถ
router.post('/', addColor);
router.get('/:color_id', getColor);
router.put('/:color_id', updateColor);
router.delete('/:color_id', deleteColor);
router.get('/', getAllColors);

module.exports = router; 