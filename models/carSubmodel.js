const prisma = require('../config/db');

// Function to get submodels by model ID
const getSubmodelsByModel = async (modelId) => {
    return await prisma.car_submodel.findMany({
        where: { model_id: modelId }
    });
};

module.exports = {
    getSubmodelsByModel
}; 