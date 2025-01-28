const router = require('express').Router();
const floorplanController = require('../controllers/floorplanFinancingController');
const asyncHandler = require('../middleware/asyncHandler');

// CRUD Routes
router.post('/',
    asyncHandler(floorplanController.create)
);

router.get('/',
    asyncHandler(floorplanController.getAll)
);

router.get('/:id',
    asyncHandler(floorplanController.getById)
);

router.put('/:id',
    asyncHandler(floorplanController.update)
);

router.delete('/:id',
    asyncHandler(floorplanController.remove)
);

module.exports = router; 