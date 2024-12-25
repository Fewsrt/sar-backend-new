const express = require('express');
const { getProvinces, getDistrictsByProvinceId, getSubdistrictsByDistrictId } = require('../controllers/employee/geographyController');
const authenticateToken = require('../middleware/authenticateToken');
const router = express.Router();

// เฉพาะผู้ที่มี API key ถูกต้องที่สามารถเข้าถึงข้อมูลจังหวัด เขต และแขวงได้
router.get('/provinces', authenticateToken, getProvinces);
router.get('/provinces/:provinceId/districts', authenticateToken, getDistrictsByProvinceId);
router.get('/districts/:districtId/subdistricts', authenticateToken, getSubdistrictsByDistrictId);

module.exports = router;
