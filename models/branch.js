// models/branch.js
const prisma = require('../config/db');

// Get list of branches
const getBranches = async () => {
    return await prisma.branch.findMany({
        include: {
            province: true,
            district: true,
            subdistrict: true,
            employee: true,
            sale: true,
            accounting: true,
            liveSchedule: true,
        },
    });
};

// Get branch by ID
const getBranchById = async (branchId) => {
    return await prisma.branch.findUnique({
        where: { branch_id: parseInt(branchId) },
        include: {
            province: true,
            district: true,
            subdistrict: true,
            employee: true,
            sale: true,
            accounting: true,
            liveSchedule: true,
        },
    });
};

// Create a new branch
const createBranch = async (data) => {
    // แปลง string เป็น float สำหรับ latitude และ longitude
    const latitude = data.latitude ? parseFloat(data.latitude) : null;
    const longitude = data.longitude ? parseFloat(data.longitude) : null;
    const radius = data.radius ? parseInt(data.radius) : 100;

    return await prisma.branch.create({
        data: {
            ...data,
            latitude,
            longitude,
            radius
        }
    });
};

// Update branch by ID
const updateBranch = async (branchId, data) => {
    // แปลง string เป็น float สำหรับ latitude และ longitude
    const latitude = data.latitude ? parseFloat(data.latitude) : null;
    const longitude = data.longitude ? parseFloat(data.longitude) : null;
    const radius = data.radius ? parseInt(data.radius) : undefined;

    return await prisma.branch.update({
        where: { branch_id: parseInt(branchId) },
        data: {
            ...data,
            latitude,
            longitude,
            ...(radius && { radius })
        },
    });
};

// Delete branch by ID
const deleteBranch = async (branchId) => {
    return await prisma.branch.delete({
        where: { branch_id: parseInt(branchId) },
    });
};

// ฟังก์ชันใหม่: ค้นหาสาขาที่อยู่ในรัศมีที่กำหนด
const findBranchesInRadius = async (lat, lng, radiusInMeters = 100) => {
    // คำนวณระยะห่างโดยใช้ Haversine formula
    const branches = await prisma.$queryRaw`
        SELECT *, 
        (6371 * acos(cos(radians(${lat})) * cos(radians(latitude)) * 
        cos(radians(longitude) - radians(${lng})) + 
        sin(radians(${lat})) * sin(radians(latitude)))) * 1000 AS distance
        FROM branch
        WHERE latitude IS NOT NULL AND longitude IS NOT NULL
        HAVING distance <= ${radiusInMeters}
        ORDER BY distance;
    `;
    return branches;
};

module.exports = {
    getBranches,
    getBranchById,
    createBranch,
    updateBranch,
    deleteBranch,
    findBranchesInRadius
};