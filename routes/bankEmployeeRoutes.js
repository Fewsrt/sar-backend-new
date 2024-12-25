const router = require('express').Router();
const bankEmployeeController = require('../controllers/employee/bankEmployeeController');
const asyncHandler = require('../middleware/asyncHandler');

router
  .route('/')
  .get(asyncHandler(bankEmployeeController.getAllBankEmployees))
  .post(asyncHandler(bankEmployeeController.createBankEmployee));

router
  .route('/:bankEmployeeId')
  .get(asyncHandler(bankEmployeeController.getBankEmployeeById))
  .patch(asyncHandler(bankEmployeeController.updateBankEmployee))
  .delete(asyncHandler(bankEmployeeController.deleteBankEmployee));

module.exports = router; 