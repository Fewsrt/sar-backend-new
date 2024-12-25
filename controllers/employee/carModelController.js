const carModel = require('../../models/carModel');

// Create a new car model
const createCarModel = async (req, res) => {
    const { model_name, brand_id } = req.body;

    try {
        const newCarModel = await carModel.createCarModel({
            model_name,
            brand_id
        });
        res.status(201).json(newCarModel);
    } catch (error) {
        console.error('Error creating car model:', error);
        res.status(500).json({ error: 'Unable to create car model' });
    }
};

// Get all car models
const getCarModels = async (req, res) => {
    try {
        const carModels = await carModel.getCarModels();
        res.json(carModels);
    } catch (error) {
        console.error('Error fetching car models:', error);
        res.status(500).json({ error: 'Unable to fetch car models' });
    }
};

// Get car models by brand ID
const getCarModelsByBrand = async (req, res) => {
    const { brandId } = req.params;

    try {
        const carModels = await carModel.getCarModelsByBrand(parseInt(brandId));
        res.json(carModels);
    } catch (error) {
        console.error('Error fetching car models:', error);
        res.status(500).json({ error: 'Unable to fetch car models' });
    }
};

module.exports = {
    createCarModel,
    getCarModels,
    getCarModelsByBrand
}; 