const prisma = require('../config/db');

// Function to get all car brands
const getCarBrands = async () => {
    return await prisma.car_brand.findMany();
};

module.exports = {
    getCarBrands
}; 