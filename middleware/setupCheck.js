const setupService = require('../services/setupService');
const { AppError } = require('./errorHandler');

const requireSetup = async (req, res, next) => {
    const hasSuperAdmin = await setupService.checkSuperAdmin();
    
    if (hasSuperAdmin) {
        throw new AppError('System is already initialized', 400);
    }
    
    next();
};

const requireInitialized = async (req, res, next) => {
    const hasSuperAdmin = await setupService.checkSuperAdmin();
    
    if (!hasSuperAdmin) {
        throw new AppError('System needs to be initialized first', 400);
    }
    
    next();
};

module.exports = {
    requireSetup,
    requireInitialized
}; 