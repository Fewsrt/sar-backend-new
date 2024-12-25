const express = require('express');
const {
    getAllReservations,
    getReservationById,
    getReservationsByCustomerId,
    getReservationsByCarId,
    createReservation,
    updateReservation,
    deleteReservation
} = require('../controllers/employee/reservationController');
const authenticateToken = require('../middleware/authenticateToken');

const router = express.Router();

// Protect all routes with authentication
router.use(authenticateToken);

// Get all reservations
router.get('/', getAllReservations);

// Get reservations by customer ID
router.get('/customer/:customerId', getReservationsByCustomerId);

// Get reservations by car ID
router.get('/car/:carId', getReservationsByCarId);

// Get reservation by ID
router.get('/:reservationId', getReservationById);

// Create new reservation
router.post('/', createReservation);

// Update reservation
router.patch('/:reservationId', updateReservation);

// Delete reservation
router.delete('/:reservationId', deleteReservation);

module.exports = router; 