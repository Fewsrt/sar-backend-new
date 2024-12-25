const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all live schedules
const getAllLiveSchedules = async () => {
    return await prisma.liveSchedule.findMany({
        include: {
            branch: true,
        },
    });
};

// Get live schedule by ID
const getLiveScheduleById = async (liveId) => {
    return await prisma.liveSchedule.findUnique({
        where: { live_id: parseInt(liveId) },
        include: {
            branch: true,
        },
    });
};

// Get live schedules by branch ID
const getLiveSchedulesByBranchId = async (branchId) => {
    return await prisma.liveSchedule.findMany({
        where: { branch_id: parseInt(branchId) },
        include: {
            branch: true,
        },
    });
};

// Get live schedules by category
const getLiveSchedulesByCategory = async (category) => {
    return await prisma.liveSchedule.findMany({
        where: { live_category: category },
        include: {
            branch: true,
        },
    });
};

// Get upcoming live schedules
const getUpcomingLiveSchedules = async () => {
    return await prisma.liveSchedule.findMany({
        where: {
            start_datetime: {
                gte: new Date(),
            },
        },
        include: {
            branch: true,
        },
        orderBy: {
            start_datetime: 'asc',
        },
    });
};

// Create live schedule
const createLiveSchedule = async ({
    live_category,
    branch_id,
    start_datetime,
    end_datetime,
    description
}) => {
    return await prisma.liveSchedule.create({
        data: {
            live_category,
            branch_id: parseInt(branch_id),
            start_datetime: new Date(start_datetime),
            end_datetime: new Date(end_datetime),
            description
        },
        include: {
            branch: true,
        },
    });
};

// Update live schedule
const updateLiveSchedule = async (liveId, {
    live_category,
    branch_id,
    start_datetime,
    end_datetime,
    description
}) => {
    return await prisma.liveSchedule.update({
        where: { live_id: parseInt(liveId) },
        data: {
            live_category,
            branch_id: branch_id ? parseInt(branch_id) : undefined,
            start_datetime: start_datetime ? new Date(start_datetime) : undefined,
            end_datetime: end_datetime ? new Date(end_datetime) : undefined,
            description
        },
        include: {
            branch: true,
        },
    });
};

// Delete live schedule
const deleteLiveSchedule = async (liveId) => {
    return await prisma.liveSchedule.delete({
        where: { live_id: parseInt(liveId) },
    });
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