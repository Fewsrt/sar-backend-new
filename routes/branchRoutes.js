// routes/branchRoutes.js
const express = require('express');
const { 
    getBranches, 
    getBranchById, 
    createBranch, 
    updateBranch, 
    deleteBranch,
    findNearbyBranches 
} = require('../controllers/employee/branchController');
const authenticateToken = require('../middleware/authenticateToken');

const router = express.Router();

// เส้นทางสำหรับจัดการข้อมูล branch

// Get list of branches
router.get('/', authenticateToken, getBranches);

// Get branch by ID
router.get('/:branchId', authenticateToken, getBranchById);

// Create a new branch
router.post('/', authenticateToken, createBranch);

// Update branch by ID
router.patch('/:branchId', authenticateToken, updateBranch);

// Delete branch by ID
router.delete('/:branchId', authenticateToken, deleteBranch);

// เพิ่มเส้นทางใหม่
router.get('/nearby/search', authenticateToken, findNearbyBranches);

module.exports = router;
