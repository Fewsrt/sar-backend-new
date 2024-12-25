const router = require('express').Router();
const companyController = require('../controllers/employee/companyController');
const adminController = require('../controllers/SystemAdmin/adminController');
const { authenticateToken, isSuperAdmin } = require('../middleware/auth');
const asyncHandler = require('../middleware/asyncHandler');
const systemLogController = require('../controllers/SystemAdmin/systemLogController');
const systemSettingController = require('../controllers/SystemAdmin/systemSettingController');

// Company routes
router.get('/companies', authenticateToken, asyncHandler(companyController.getAllCompanies));
router.post('/companies', authenticateToken, isSuperAdmin, asyncHandler(companyController.createCompany));
router.put('/companies/:id', authenticateToken, isSuperAdmin, asyncHandler(companyController.updateCompany));
router.delete('/companies/:id', authenticateToken, isSuperAdmin, asyncHandler(companyController.deleteCompany));

// Admin routes
router.get('/admins', authenticateToken, isSuperAdmin, asyncHandler(adminController.getAllAdmins));
router.post('/admins', authenticateToken, isSuperAdmin, asyncHandler(adminController.createAdmin));
router.put('/admins/:id', authenticateToken, isSuperAdmin, asyncHandler(adminController.updateAdmin));
router.delete('/admins/:id', authenticateToken, isSuperAdmin, asyncHandler(adminController.deleteAdmin));

// System Log routes
router.get('/system-logs', authenticateToken, isSuperAdmin, asyncHandler(systemLogController.getLogs));
router.get('/system-logs/export', authenticateToken, isSuperAdmin, asyncHandler(systemLogController.exportLogs));
router.post('/system-logs', authenticateToken, asyncHandler(systemLogController.createLog));

// System Setting routes
router.get('/system-settings', authenticateToken, asyncHandler(systemSettingController.getSettings));
router.put('/system-settings', authenticateToken, isSuperAdmin, asyncHandler(systemSettingController.updateSettings));
router.get('/system-settings/:key', authenticateToken, asyncHandler(systemSettingController.getSetting));

module.exports = router; 