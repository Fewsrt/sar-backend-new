const reservationModel = require('../../models/reservation');

// Get all reservations
const getAllReservations = async (req, res) => {
    try {
        const reservations = await reservationModel.getAllReservations();
        res.json({
            success: true,
            data: reservations
        });
    } catch (error) {
        console.error('Error in getAllReservations:', error);
        res.status(500).json({ 
            success: false,
            error: 'Unable to fetch reservation records' 
        });
    }
};

// Get reservation by ID
const getReservationById = async (req, res) => {
    const { reservationId } = req.params;
    try {
        const reservation = await reservationModel.getReservationById(reservationId);
        res.json({
            success: true,
            data: reservation || null
        });
    } catch (error) {
        console.error('Error in getReservationById:', error);
        res.status(500).json({ 
            success: false,
            error: 'Unable to fetch reservation' 
        });
    }
};

// Get reservations by customer ID
const getReservationsByCustomerId = async (req, res) => {
    const { customerId } = req.params;
    try {
        const reservations = await reservationModel.getReservationsByCustomerId(customerId);
        res.json({
            success: true,
            data: reservations || []
        });
    } catch (error) {
        console.error('Error in getReservationsByCustomerId:', error);
        res.status(500).json({ 
            success: false,
            error: 'Unable to fetch customer reservations' 
        });
    }
};

// Get reservations by car ID
const getReservationsByCarId = async (req, res) => {
    const { carId } = req.params;
    try {
        const reservations = await reservationModel.getReservationsByCarId(carId);
        res.json({
            success: true,
            data: reservations || []
        });
    } catch (error) {
        console.error('Error in getReservationsByCarId:', error);
        res.status(500).json({ 
            success: false,
            error: 'Unable to fetch car reservations' 
        });
    }
};

// Create reservation
const createReservation = async (req, res) => {
    const {
        customer_id,
        car_id,
        reservation_date,
        due_date,
        status,
        note
    } = req.body;

    try {
        const newReservation = await reservationModel.createReservation({
            customer_id,
            car_id,
            reservation_date,
            due_date,
            status,
            note
        });
        res.status(201).json({
            success: true,
            data: newReservation
        });
    } catch (error) {
        console.error('Error in createReservation:', error);
        res.status(500).json({ 
            success: false,
            error: 'Unable to create reservation' 
        });
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
        res.json({
            success: true,
            data: updatedReservation
        });
    } catch (error) {
        console.error('Error in updateReservation:', error);
        res.status(500).json({ 
            success: false,
            error: 'Unable to update reservation' 
        });
    }
};

// Delete reservation
const deleteReservation = async (req, res) => {
    const { reservationId } = req.params;
    try {
        await reservationModel.deleteReservation(reservationId);
        res.json({ 
            success: true,
            message: 'Reservation deleted successfully' 
        });
    } catch (error) {
        console.error('Error in deleteReservation:', error);
        res.status(500).json({ 
            success: false,
            error: 'Unable to delete reservation' 
        });
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