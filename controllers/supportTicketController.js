const { 
    createTicket, 
    getTicket, 
    updateTicket, 
    closeTicket, 
    listTickets 
} = require('../models/supportTicket');

// Create new ticket
async function createNewTicket(req, res) {
    try {
        const ticketData = {
            ...req.body,
            reporter_type: req.user.role === 'admin' ? 'admin' : 'employee',
            [req.user.role === 'admin' ? 'admin_id' : 'employee_id']: req.user.id
        };

        const newTicket = await createTicket(ticketData);
        
        res.status(201).json({
            success: true,
            data: newTicket
        });
    } catch (error) {
        console.error('Error creating ticket:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to create ticket',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

// Get ticket by ID
async function getTicketById(req, res) {
    try {
        const ticket = await getTicket(parseInt(req.params.id));
        
        if (!ticket) {
            return res.status(404).json({
                success: false,
                error: 'Ticket not found'
            });
        }

        res.json({
            success: true,
            data: ticket
        });
    } catch (error) {
        console.error('Error fetching ticket:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch ticket',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

// Update ticket
async function updateTicketById(req, res) {
    try {
        const updatedTicket = await updateTicket(parseInt(req.params.id), req.body);
        
        res.json({
            success: true,
            data: updatedTicket
        });
    } catch (error) {
        console.error('Error updating ticket:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update ticket',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

// Close ticket
async function closeTicketById(req, res) {
    try {
        const closedTicket = await closeTicket(parseInt(req.params.id));
        
        res.json({
            success: true,
            data: closedTicket,
            message: 'Ticket closed successfully'
        });
    } catch (error) {
        console.error('Error closing ticket:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to close ticket',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

// List tickets with filters
async function getAllTickets(req, res) {
    try {
        const filters = {
            status: req.query.status,
            priority: req.query.priority,
            category: req.query.category,
            search: req.query.search
        };

        const tickets = await listTickets(filters);
        
        res.json({
            success: true,
            data: tickets
        });
    } catch (error) {
        console.error('Error fetching tickets:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch tickets',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

module.exports = {
    createNewTicket,
    getTicketById,
    updateTicketById,
    closeTicketById,
    getAllTickets
}; 