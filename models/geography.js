// model/geography.js
const prisma = require('../config/db');

const getProvinces = async () => {
  return await prisma.province.findMany();
};

const getDistrictsByProvinceId = async (provinceId) => {
  return await prisma.district.findMany({
    where: { province_id: parseInt(provinceId) },
  });
};

const getSubdistrictsByDistrictId = async (districtId) => {
  return await prisma.subdistrict.findMany({
    where: { district_id: parseInt(districtId) },
  });
};

module.exports = {
  getProvinces,
  getDistrictsByProvinceId,
  getSubdistrictsByDistrictId,
};
