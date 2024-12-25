const express = require('express');
const {
    getAllLiveSchedules,
    getLiveScheduleById,
    getLiveSchedulesByBranchId,
    getLiveSchedulesByCategory,
    getUpcomingLiveSchedules,
    createLiveSchedule,
    updateLiveSchedule,
    deleteLiveSchedule
} = require('../controllers/employee/liveScheduleController');
const authenticateToken = require('../middleware/authenticateToken');

const router = express.Router();

// Protect all routes with authentication
router.use(authenticateToken);

// Get all live schedules
router.get('/', getAllLiveSchedules);

// Get upcoming live schedules
router.get('/upcoming', getUpcomingLiveSchedules);

// Get live schedules by branch ID
router.get('/branch/:branchId', getLiveSchedulesByBranchId);

// Get live schedules by category
router.get('/category/:category', getLiveSchedulesByCategory);

// Get live schedule by ID
router.get('/:liveId', getLiveScheduleById);

// Create new live schedule
router.post('/', createLiveSchedule);

// Update live schedule
router.patch('/:liveId', updateLiveSchedule);

// Delete live schedule
router.delete('/:liveId', deleteLiveSchedule);

module.exports = router; 