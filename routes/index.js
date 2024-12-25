const router = require('express').Router();
const auth = require('../middleware/authenticateToken');

// Async error wrapper
const asyncHandler = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// Routes with async error handling
router.use('/system', asyncHandler(require('./SystemRoutes/systemRoutes')));
router.use('/auth', asyncHandler(require('./authRoutes')));
router.use('/token', asyncHandler(require('./tokenRoutes')));
router.use('/geography', auth, asyncHandler(require('./geographyRoutes')));
router.use('/suppliers', auth, asyncHandler(require('./supplierRoutes')));
router.use('/branch', auth, asyncHandler(require('./branchRoutes')));
router.use('/employees', asyncHandler(require('./employeeRoutes')));
router.use('/attendances', auth, asyncHandler(require('./attendanceRoutes')));
router.use('/cars', auth, asyncHandler(require('./carRoutes')));
router.use('/users', auth, asyncHandler(require('./userRoutes')));
router.use('/car-models', auth, asyncHandler(require('./carModelRoutes')));
router.use('/car-brands', auth, asyncHandler(require('./carBrandRoutes')));
router.use('/car-submodels', auth, asyncHandler(require('./carSubmodelRoutes')));
router.use('/car-codes', auth, asyncHandler(require('./carCodeRoutes')));
router.use('/colors', auth, asyncHandler(require('./colorRoutes')));
router.use('/customers', auth, asyncHandler(require('./customerRoutes')));
router.use('/maintenance', auth, asyncHandler(require('./maintenanceRoutes')));
router.use('/car-inspections', auth, asyncHandler(require('./carInspectionRoutes')));
router.use('/reservations', auth, asyncHandler(require('./reservationRoutes')));
router.use('/sales', auth, asyncHandler(require('./saleRoutes')));
router.use('/bank-employees', auth, asyncHandler(require('./bankEmployeeRoutes')));
router.use('/accounting', auth, asyncHandler(require('./accountingRoutes')));
router.use('/purchase-histories', auth, asyncHandler(require('./customerPurchaseHistoryRoutes')));
router.use('/transfer-trackings', auth, asyncHandler(require('./bankTransferTrackingRoutes')));
router.use('/live-schedules', auth, asyncHandler(require('./liveScheduleRoutes')));
router.use('/tax-invoices', auth, asyncHandler(require('./taxInvoiceRoutes')));
router.use('/purchase-tax-invoices', auth, asyncHandler(require('./purchaseTaxInvoiceRoutes')));
router.use('/withholding-tax-invoices', auth, asyncHandler(require('./withholdingTaxInvoiceRoutes')));

module.exports = router; 