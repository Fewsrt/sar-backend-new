const router = require('express').Router();
const setupController = require('../../controllers/SystemAdmin/setupController');
const setupTokenController = require('../../controllers/SystemAdmin/setupTokenController');
const asyncHandler = require('../../middleware/asyncHandler');

router
    .get('/setup/status', asyncHandler(setupController.checkSetupStatus))
    .get('/setup/token', asyncHandler(setupTokenController.generateSetupToken))
    .post('/setup/initialize', 
        asyncHandler(setupController.initializeSystem)
    );

module.exports = router; 