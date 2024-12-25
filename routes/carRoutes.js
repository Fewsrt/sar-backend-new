const router = require('express').Router();
const carController = require('../controllers/employee/carController');
const asyncHandler = require('../middleware/asyncHandler');

router
  .route('/')
  .get(asyncHandler(carController.getAllCars))
  .post(asyncHandler(carController.addCar));

router
  .route('/:car_id')
  .get(asyncHandler(carController.getCar))
  .put(asyncHandler(carController.updateCar))
  .delete(asyncHandler(carController.deleteCar));

router
  .get('/monthly/:year/:month', asyncHandler(carController.getCarsByMonth))
  .get('/yearly/:year', asyncHandler(carController.getCarsByYear))
  .get('/code/:car_code', asyncHandler(carController.getCarByCode))
  .get('/stats/summary', asyncHandler(carController.getCarStats))
  .delete('/monthly/:year/:month', asyncHandler(carController.deleteCarsByMonth))
  .delete('/yearly/:year', asyncHandler(carController.deleteCarsByYear));

module.exports = router;