const router = require('express').Router();
const setupController = require('../../controllers/SystemAdmin/setupController');
const asyncHandler = require('../../middleware/asyncHandler');

router
    .get('/setup/status', asyncHandler(setupController.checkSetupStatus))
    .post('/setup/initialize', asyncHandler(setupController.initializeSystem));

module.exports = router; 