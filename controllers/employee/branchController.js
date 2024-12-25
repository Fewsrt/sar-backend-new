// controllers/branchController.js
const branchModel = require('../../models/branch');

// Get list of branches
const getBranches = async (req, res) => {
    try {
        const branches = await branchModel.getBranches();
        res.json(branches);
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch branches' });
    }
};

// Get branch by ID
const getBranchById = async (req, res) => {
    const { branchId } = req.params;
    try {
        const branch = await branchModel.getBranchById(branchId);
        if (!branch) {
            res.status(404).json({ error: 'Branch not found' });
        } else {
            res.json(branch);
        }
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch branch' });
    }
};

// Create a new branch
const createBranch = async (req, res) => {
    const { branch_name, address, subdistrict_id, district_id, province_id, postal_code, phone } = req.body;
    try {
        const newBranch = await branchModel.createBranch({
            branch_name,
            address,
            subdistrict_id,
            district_id,
            province_id,
            postal_code,
            phone,
        });
        res.status(201).json(newBranch);
    } catch (error) {
        res.status(500).json({ error: 'Unable to create branch' });
    }
};

// Update branch by ID
const updateBranch = async (req, res) => {
    const { branchId } = req.params;
    const { branch_name, address, subdistrict_id, district_id, province_id, postal_code, phone } = req.body;
    try {
        const updatedBranch = await branchModel.updateBranch(branchId, {
            branch_name,
            address,
            subdistrict_id,
            district_id,
            province_id,
            postal_code,
            phone,
        });
        res.json(updatedBranch);
    } catch (error) {
        res.status(500).json({ error: 'Unable to update branch' });
    }
};

// Delete branch by ID
const deleteBranch = async (req, res) => {
    const { branchId } = req.params;
    try {
        await branchModel.deleteBranch(branchId);
        res.status(200).json({ message: 'Branch deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Unable to delete branch' });
    }
};

module.exports = {
    getBranches,
    getBranchById,
    createBranch,
    updateBranch,
    deleteBranch,
};