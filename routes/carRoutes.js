const router = require('express').Router();
const authenticateToken = require('../middleware/authenticateToken');
const {
    mainController,
    financialController,
    documentController,
    locationController,
    inspectionController,
    statisticsController,
    approvalController,
    taxController,
    entitiesController,
    generalInfoController
} = require('../controllers/car');
const asyncHandler = require('../middleware/asyncHandler');

// Main routes
router.route('/')
    .get(authenticateToken, asyncHandler(mainController.getAllCars))
    .post(authenticateToken, asyncHandler(mainController.addCar));

router.route('/:car_id')
    .get(authenticateToken, asyncHandler(mainController.getCar))
    .patch(authenticateToken, asyncHandler(mainController.updateCar))
    .delete(authenticateToken, asyncHandler(mainController.deleteCar));

// Financial routes
router.route('/:car_id/financial')
    .get(authenticateToken, asyncHandler(financialController.getFinancial))
    .put(authenticateToken, asyncHandler(financialController.updateFinancial));

router.route('/:car_id/expenses')
    .get(authenticateToken, asyncHandler(financialController.getExpenseRecords))
    .post(authenticateToken, asyncHandler(financialController.addExpenseRecord));

router.route('/:car_id/expenses/:expense_id')
    .patch(authenticateToken, asyncHandler(financialController.updateExpenseRecord))
    .delete(authenticateToken, asyncHandler(financialController.deleteExpenseRecord));

// Document routes
router.route('/:car_id/documents')
    .get(authenticateToken, asyncHandler(documentController.getCarDocuments))
    .put(authenticateToken, asyncHandler(documentController.updateCarDocuments));

router.route('/:car_id/documents/:document_id')
    .get(authenticateToken, asyncHandler(documentController.trackCarDocument))
    .patch(authenticateToken, asyncHandler(documentController.updateCarDocumentStatus));

// Location routes
router.route('/:car_id/location')
    .get(authenticateToken, asyncHandler(locationController.getCarLocation))
    .put(authenticateToken, asyncHandler(locationController.updateCarLocation));

router.route('/:car_id/parking')
    .patch(authenticateToken, asyncHandler(locationController.updateCarParkingStatus));

// Inspection routes
router.route('/:car_id/inspections')
    .get(authenticateToken, asyncHandler(inspectionController.getCarInspections))
    .post(authenticateToken, asyncHandler(inspectionController.addInspection));

router.route('/:car_id/inspections/:inspection_id')
    .patch(authenticateToken, asyncHandler(inspectionController.updateCarInspection))
    .delete(authenticateToken, asyncHandler(inspectionController.deleteCarInspection));

// Statistics routes
router.get('/stats/monthly/:year/:month', authenticateToken, asyncHandler(statisticsController.getCarsByMonth));
router.get('/stats/yearly/:year', authenticateToken, asyncHandler(statisticsController.getCarsByYear));
router.get('/stats/summary', authenticateToken, asyncHandler(statisticsController.getCarStats));
router.get('/code/:car_code', authenticateToken, asyncHandler(mainController.getCarByCode));

// Bulk delete routes
router.delete('/monthly/:year/:month', authenticateToken, asyncHandler(statisticsController.deleteCarsByMonth));
router.delete('/yearly/:year', authenticateToken, asyncHandler(statisticsController.deleteCarsByYear));

// Approval routes
router.route('/:car_id/approval')
    .get(authenticateToken, asyncHandler(approvalController.getCarApproval))
    .put(authenticateToken, asyncHandler(approvalController.updateCarApproval));

// Tax routes
router.route('/:car_id/tax')
    .get(authenticateToken, asyncHandler(taxController.getCarTax))
    .put(authenticateToken, asyncHandler(taxController.updateCarTax));

// Associated entities routes
router.route('/:car_id/entities')
    .get(authenticateToken, asyncHandler(entitiesController.getCarEntities))
    .put(authenticateToken, asyncHandler(entitiesController.updateCarEntities));

// General info routes
router.route('/:car_id/info')
    .get(authenticateToken, asyncHandler(generalInfoController.getCarInfo))
    .put(authenticateToken, asyncHandler(generalInfoController.updateCarInfo));

module.exports = router;