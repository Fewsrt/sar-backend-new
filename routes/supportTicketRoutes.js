const router = require('express').Router();
const { authenticateToken, isSuperAdmin } = require('../middleware/auth');
const {
    createNewTicket,
    getTicketById,
    updateTicketById,
    closeTicketById,
    getAllTickets
} = require('../controllers/supportTicketController');
const asyncHandler = require('../middleware/asyncHandler');

// Public routes (require authentication)
router.get('/tickets', authenticateToken, isSuperAdmin, asyncHandler(getAllTickets));
router.post('/tickets', authenticateToken, isSuperAdmin, asyncHandler(createNewTicket));
router.get('/tickets/:id', authenticateToken, isSuperAdmin, asyncHandler(getTicketById));

// Protected routes (require admin privileges)
router.put('/tickets/:id', authenticateToken, isSuperAdmin, asyncHandler(updateTicketById));
router.patch('/tickets/:id/close', authenticateToken, isSuperAdmin, asyncHandler(closeTicketById));

module.exports = router; 