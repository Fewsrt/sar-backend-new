// controllers/geographyController.js
const geographyModel = require('../../models/geography');

const getProvinces = async (req, res) => {
  try {
    const provinces = await geographyModel.getProvinces();
    res.json(provinces);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch provinces' });
  }
};

const getDistrictsByProvinceId = async (req, res) => {
  const { provinceId } = req.params;
  try {
    const districts = await geographyModel.getDistrictsByProvinceId(provinceId);
    res.json(districts);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch districts' });
  }
};

const getSubdistrictsByDistrictId = async (req, res) => {
  const { districtId } = req.params;
  try {
    const subdistricts = await geographyModel.getSubdistrictsByDistrictId(districtId);
    res.json(subdistricts);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch subdistricts' });
  }
};

module.exports = {
  getProvinces,
  getDistrictsByProvinceId,
  getSubdistrictsByDistrictId,
};
