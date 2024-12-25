const router = require('express').Router();
const accountingController = require('../controllers/employee/accountingController');
const asyncHandler = require('../middleware/asyncHandler');

// Group routes by path
router
  .route('/')
  .get(asyncHandler(accountingController.getAllAccounting))
  .post(asyncHandler(accountingController.createAccounting));

router
  .route('/:accountingId')
  .get(asyncHandler(accountingController.getAccountingById))
  .patch(asyncHandler(accountingController.updateAccounting))
  .delete(asyncHandler(accountingController.deleteAccounting));

router
  .get('/branch/:branchId', asyncHandler(accountingController.getAccountingByBranchId))
  .get('/car/:carId', asyncHandler(accountingController.getAccountingByCarId));

module.exports = router; 