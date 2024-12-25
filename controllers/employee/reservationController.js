const reservationModel = require('../../models/reservation');

// Get all reservations
const getAllReservations = async (req, res) => {
    try {
        const reservations = await reservationModel.getAllReservations();
        res.json(reservations);
    } catch (error) {
        console.error('Error in getAllReservations:', error);
        res.status(500).json({ error: 'Unable to fetch reservation records' });
    }
};

// Get reservation by ID
const getReservationById = async (req, res) => {
    const { reservationId } = req.params;
    try {
        const reservation = await reservationModel.getReservationById(reservationId);
        if (!reservation) {
            return res.status(404).json({ error: 'Reservation not found' });
        }
        res.json(reservation);
    } catch (error) {
        console.error('Error in getReservationById:', error);
        res.status(500).json({ error: 'Unable to fetch reservation' });
    }
};

// Get reservations by customer ID
const getReservationsByCustomerId = async (req, res) => {
    const { customerId } = req.params;
    try {
        const reservations = await reservationModel.getReservationsByCustomerId(customerId);
        if (!reservations || reservations.length === 0) {
            return res.status(404).json({ error: 'No reservations found for this customer' });
        }
        res.json(reservations);
    } catch (error) {
        console.error('Error in getReservationsByCustomerId:', error);
        res.status(500).json({ error: 'Unable to fetch customer reservations' });
    }
};

// Get reservations by car ID
const getReservationsByCarId = async (req, res) => {
    const { carId } = req.params;
    try {
        const reservations = await reservationModel.getReservationsByCarId(carId);
        if (!reservations || reservations.length === 0) {
            return res.status(404).json({ error: 'No reservations found for this car' });
        }
        res.json(reservations);
    } catch (error) {
        console.error('Error in getReservationsByCarId:', error);
        res.status(500).json({ error: 'Unable to fetch car reservations' });
    }
};

// Create reservation
const createReservation = async (req, res) => {
    const {
        customer_id,
        car_id,
        reservation_date,
        status,
        note
    } = req.body;

    try {
        const newReservation = await reservationModel.createReservation({
            customer_id,
            car_id,
            reservation_date,
            status,
            note
        });
        res.status(201).json(newReservation);
    } catch (error) {
        console.error('Error in createReservation:', error);
        res.status(500).json({ error: 'Unable to create reservation' });
    }
};

// Update reservation
const updateReservation = async (req, res) => {
    const { reservationId } = req.params;
    const {
        reservation_date,
        status,
        note
    } = req.body;

    try {
        const updatedReservation = await reservationModel.updateReservation(
            reservationId,
            {
                reservation_date,
                status,
                note
            }
        );
        res.json(updatedReservation);
    } catch (error) {
        console.error('Error in updateReservation:', error);
        res.status(500).json({ error: 'Unable to update reservation' });
    }
};

// Delete reservation
const deleteReservation = async (req, res) => {
    const { reservationId } = req.params;
    try {
        await reservationModel.deleteReservation(reservationId);
        res.json({ message: 'Reservation deleted successfully' });
    } catch (error) {
        console.error('Error in deleteReservation:', error);
        res.status(500).json({ error: 'Unable to delete reservation' });
    }
};

module.exports = {
    getAllReservations,
    getReservationById,
    getReservationsByCustomerId,
    getReservationsByCarId,
    createReservation,
    updateReservation,
    deleteReservation,
}; 