const prisma = require('../config/db');

// Function to create a car model
const createCarModel = async (data) => {
    return await prisma.car_model.create({ data });
};

// Function to get all car models
const getCarModels = async () => {
    return await prisma.car_model.findMany();
};

// Function to get car models by brand ID
const getCarModelsByBrand = async (brandId) => {
    return await prisma.car_model.findMany({
        where: { brand_id: brandId }
    });
};

module.exports = {
    createCarModel,
    getCarModels,
    getCarModelsByBrand
};
