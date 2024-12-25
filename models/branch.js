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
    return await prisma.branch.create({
        data
    });
};

// Update branch by ID
const updateBranch = async (branchId, { branch_name, address, subdistrict_id, district_id, province_id, postal_code, phone }) => {
    return await prisma.branch.update({
        where: { branch_id: parseInt(branchId) },
        data: {
            branch_name,
            address,
            subdistrict_id,
            district_id,
            province_id,
            postal_code,
            phone,
        },
    });
};

// Delete branch by ID
const deleteBranch = async (branchId) => {
    return await prisma.branch.delete({
        where: { branch_id: parseInt(branchId) },
    });
};

module.exports = {
    getBranches,
    getBranchById,
    createBranch,
    updateBranch,
    deleteBranch,
};