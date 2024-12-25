// controllers/supplierController.js
const supplierModel = require('../../models/supplier');

// Get list of suppliers
const getSuppliers = async (req, res) => {
    try {
        const suppliers = await supplierModel.getSuppliers();
        res.json(suppliers);
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch suppliers' });
    }
};

// Get supplier by ID
const getSupplierById = async (req, res) => {
    const { supplierId } = req.params;
    try {
        const supplier = await supplierModel.getSupplierById(supplierId);
        if (!supplier) {
            res.status(404).json({ error: 'Supplier not found' });
        } else {
            res.json(supplier);
        }
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch supplier' });
    }
};

// Create a new supplier
const createSupplier = async (req, res) => {
    const { supplier_code, supplier_name, branch_name, tax_id } = req.body;
    try {
        const newSupplier = await supplierModel.createSupplier({
            supplier_code,
            supplier_name,
            branch_name,
            tax_id
        });
        res.status(201).json(newSupplier);
    } catch (error) {
        console.error('Error creating supplier:', error);
        res.status(500).json({ error: 'Unable to create supplier' });
    }
};

// Update supplier by ID
const updateSupplier = async (req, res) => {
    const { supplierId } = req.params;
    const { supplier_code, supplier_name, branch_name, tax_id } = req.body;
    try {
        const updatedSupplier = await supplierModel.updateSupplier(supplierId, {
            supplier_code,
            supplier_name,
            branch_name,
            tax_id
        });
        res.json(updatedSupplier);
    } catch (error) {
        res.status(500).json({ error: 'Unable to update supplier' });
    }
};

// Delete supplier by ID
const deleteSupplier = async (req, res) => {
    const { supplierId } = req.params;
    try {
        await supplierModel.deleteSupplier(supplierId);
        res.status(200).json({ message: 'Supplier deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Unable to delete supplier' });
    }
};

module.exports = {
    getSuppliers,
    getSupplierById,
    createSupplier,
    updateSupplier,
    deleteSupplier,
};
