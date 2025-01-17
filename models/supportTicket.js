const prisma = require('../config/db');

// Create Ticket
async function createTicket(data) {
    return await prisma.supportTicket.create({
        data: {
            ticket_code: await generateTicketCode(),
            title: data.title,
            description: data.description,
            priority: data.priority,
            category: data.category,
            reporter_type: data.reporter_type,
            employee_id: data.employee_id,
            admin_id: data.admin_id,
            assignee_id: data.assignee_id,
            attachments: {
                create: data.attachments || []
            }
        },
        include: {
            employee: true,
            admin: true,
            assignee: true,
            attachments: true
        }
    });
}

// Read Ticket
async function getTicket(id) {
    return await prisma.supportTicket.findUnique({
        where: { id },
        include: {
            employee: true,
            admin: true,
            assignee: true,
            responses: {
                include: {
                    employee: true,
                    admin: true,
                    attachments: true
                }
            },
            attachments: true
        }
    });
}

// Update Ticket
async function updateTicket(id, data) {
    return await prisma.supportTicket.update({
        where: { id },
        data: {
            ...data,
            updated_at: new Date()
        },
        include: {
            responses: true,
            attachments: true
        }
    });
}

// Delete Ticket (Soft Delete via Status Change)
async function closeTicket(id) {
    return await prisma.supportTicket.update({
        where: { id },
        data: {
            status: 'closed',
            closed_at: new Date(),
            updated_at: new Date()
        }
    });
}

// List Tickets with Filters
async function listTickets(filters = {}) {
    const where = {
        AND: [
            filters.status ? { status: filters.status } : {},
            filters.priority ? { priority: filters.priority } : {},
            filters.category ? { category: filters.category } : {},
            filters.search ? {
                OR: [
                    { title: { contains: filters.search, mode: 'insensitive' } },
                    { description: { contains: filters.search, mode: 'insensitive' } },
                    { ticket_code: { contains: filters.search, mode: 'insensitive' } }
                ]
            } : {}
        ]
    };

    return await prisma.supportTicket.findMany({
        where,
        include: {
            employee: true,
            admin: true,
            assignee: true,
            responses: {
                include: {
                    attachments: true
                }
            },
            attachments: true
        },
        orderBy: {
            created_at: 'desc'
        }
    });
}

// Helper function to generate ticket code
async function generateTicketCode() {
    const year = new Date().getFullYear();
    const count = await prisma.supportTicket.count({
        where: {
            created_at: {
                gte: new Date(year, 0, 1),
                lt: new Date(year + 1, 0, 1)
            }
        }
    });
    return `TIC-${year}-${(count + 1).toString().padStart(4, '0')}`;
}

module.exports = {
    createTicket,
    getTicket,
    updateTicket,
    closeTicket,
    listTickets
}; 