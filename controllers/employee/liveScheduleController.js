const liveScheduleModel = require('../../models/liveSchedule');

// Get all live schedules
const getAllLiveSchedules = async (req, res) => {
    try {
        const schedules = await liveScheduleModel.getAllLiveSchedules();
        res.json(schedules);
    } catch (error) {
        console.error('Error in getAllLiveSchedules:', error);
        res.status(500).json({ error: 'Unable to fetch live schedules' });
    }
};

// Get live schedule by ID
const getLiveScheduleById = async (req, res) => {
    const { liveId } = req.params;
    try {
        const schedule = await liveScheduleModel.getLiveScheduleById(liveId);
        if (!schedule) {
            return res.status(404).json({ error: 'Live schedule not found' });
        }
        res.json(schedule);
    } catch (error) {
        console.error('Error in getLiveScheduleById:', error);
        res.status(500).json({ error: 'Unable to fetch live schedule' });
    }
};

// Get live schedules by branch ID
const getLiveSchedulesByBranchId = async (req, res) => {
    const { branchId } = req.params;
    try {
        const schedules = await liveScheduleModel.getLiveSchedulesByBranchId(branchId);
        if (!schedules || schedules.length === 0) {
            return res.status(404).json({ error: 'No live schedules found for this branch' });
        }
        res.json(schedules);
    } catch (error) {
        console.error('Error in getLiveSchedulesByBranchId:', error);
        res.status(500).json({ error: 'Unable to fetch branch live schedules' });
    }
};

// Get live schedules by category
const getLiveSchedulesByCategory = async (req, res) => {
    const { category } = req.params;
    try {
        const schedules = await liveScheduleModel.getLiveSchedulesByCategory(category);
        if (!schedules || schedules.length === 0) {
            return res.status(404).json({ error: 'No live schedules found for this category' });
        }
        res.json(schedules);
    } catch (error) {
        console.error('Error in getLiveSchedulesByCategory:', error);
        res.status(500).json({ error: 'Unable to fetch category live schedules' });
    }
};

// Get upcoming live schedules
const getUpcomingLiveSchedules = async (req, res) => {
    try {
        const schedules = await liveScheduleModel.getUpcomingLiveSchedules();
        res.json(schedules);
    } catch (error) {
        console.error('Error in getUpcomingLiveSchedules:', error);
        res.status(500).json({ error: 'Unable to fetch upcoming live schedules' });
    }
};

// Create live schedule
const createLiveSchedule = async (req, res) => {
    const {
        live_category,
        branch_id,
        start_datetime,
        end_datetime,
        description
    } = req.body;

    try {
        const newSchedule = await liveScheduleModel.createLiveSchedule({
            live_category,
            branch_id,
            start_datetime,
            end_datetime,
            description
        });
        res.status(201).json(newSchedule);
    } catch (error) {
        console.error('Error in createLiveSchedule:', error);
        res.status(500).json({ error: 'Unable to create live schedule' });
    }
};

// Update live schedule
const updateLiveSchedule = async (req, res) => {
    const { liveId } = req.params;
    const {
        live_category,
        branch_id,
        start_datetime,
        end_datetime,
        description
    } = req.body;

    try {
        const updatedSchedule = await liveScheduleModel.updateLiveSchedule(
            liveId,
            {
                live_category,
                branch_id,
                start_datetime,
                end_datetime,
                description
            }
        );
        res.json(updatedSchedule);
    } catch (error) {
        console.error('Error in updateLiveSchedule:', error);
        res.status(500).json({ error: 'Unable to update live schedule' });
    }
};

// Delete live schedule
const deleteLiveSchedule = async (req, res) => {
    const { liveId } = req.params;
    try {
        await liveScheduleModel.deleteLiveSchedule(liveId);
        res.json({ message: 'Live schedule deleted successfully' });
    } catch (error) {
        console.error('Error in deleteLiveSchedule:', error);
        res.status(500).json({ error: 'Unable to delete live schedule' });
    }
};

module.exports = {
    getAllLiveSchedules,
    getLiveScheduleById,
    getLiveSchedulesByBranchId,
    getLiveSchedulesByCategory,
    getUpcomingLiveSchedules,
    createLiveSchedule,
    updateLiveSchedule,
    deleteLiveSchedule,
}; 