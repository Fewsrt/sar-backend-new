const prisma = require('../config/db');

// Get all reservations
const getAllReservations = async () => {
    return await prisma.reservation.findMany({
        include: {
            customer: true,
            car: true,
        },
    });
};

// Get reservation by ID
const getReservationById = async (reservationId) => {
    return await prisma.reservation.findUnique({
        where: { reservation_id: parseInt(reservationId) },
        include: {
            customer: true,
            car: true,
        },
    });
};

// Get reservations by customer ID
const getReservationsByCustomerId = async (customerId) => {
    return await prisma.reservation.findMany({
        where: { customer_id: parseInt(customerId) },
        include: {
            customer: true,
            car: true,
        },
    });
};

// Get reservations by car ID
const getReservationsByCarId = async (carId) => {
    return await prisma.reservation.findMany({
        where: { car_id: parseInt(carId) },
        include: {
            customer: true,
            car: true,
        },
    });
};

// Create reservation
const createReservation = async ({
    customer_id,
    car_id,
    reservation_date,
    status,
    note
}) => {
    return await prisma.reservation.create({
        data: {
            customer_id: parseInt(customer_id),
            car_id: parseInt(car_id),
            reservation_date: new Date(reservation_date),
            status,
            note
        },
        include: {
            customer: true,
            car: true,
        },
    });
};

// Update reservation
const updateReservation = async (reservationId, {
    reservation_date,
    status,
    note
}) => {
    return await prisma.reservation.update({
        where: { reservation_id: parseInt(reservationId) },
        data: {
            reservation_date: reservation_date ? new Date(reservation_date) : undefined,
            status,
            note
        },
        include: {
            customer: true,
            car: true,
        },
    });
};

// Delete reservation
const deleteReservation = async (reservationId) => {
    return await prisma.reservation.delete({
        where: { reservation_id: parseInt(reservationId) },
    });
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