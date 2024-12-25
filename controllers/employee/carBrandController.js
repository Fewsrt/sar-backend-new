const carBrand = require('../../models/carBrand');

// Get all car brands
const getCarBrands = async (req, res) => {
    try {
        const brands = await carBrand.getCarBrands();
        res.json(brands);
    } catch (error) {
        console.error('Error fetching car brands:', error);
        res.status(500).json({ error: 'Unable to fetch car brands' });
    }
};

module.exports = {
    getCarBrands
}; 