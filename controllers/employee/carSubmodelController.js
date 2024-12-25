const carSubmodel = require('../../models/carSubmodel');

// Get submodels by model ID
const getSubmodelsByModel = async (req, res) => {
    const { modelId } = req.params;

    try {
        const submodels = await carSubmodel.getSubmodelsByModel(parseInt(modelId));
        res.json(submodels);
    } catch (error) {
        console.error('Error fetching submodels:', error);
        res.status(500).json({ error: 'Unable to fetch submodels' });
    }
};

module.exports = {
    getSubmodelsByModel
}; 