const prisma = require('../../config/db');
const bcrypt = require('bcryptjs');
const { AppError } = require('../../middleware/errorHandler');

const adminController = {
    // Get all admins
    getAllAdmins: async (req, res) => {
        const admins = await prisma.admin.findMany({
            select: {
                id: true,
                username: true,
                name: true,
                email: true,
                role: true,
                status: true,
                last_login: true,
                company: {
                    select: {
                        company_name: true
                    }
                }
            },
            orderBy: { created_at: 'desc' }
        });
        res.json(admins);
    },

    // Create new admin
    createAdmin: async (req, res) => {
        const { username, password, name, email, role, company_id } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const admin = await prisma.admin.create({
            data: {
                username,
                password: hashedPassword,
                name,
                email,
                role,
                company_id: company_id ? parseInt(company_id) : null
            }
        });

        // Remove password from response
        delete admin.password;
        res.status(201).json(admin);
    },

    // Update admin
    updateAdmin: async (req, res) => {
        const { id } = req.params;
        const { name, email, role, status, company_id } = req.body;

        const admin = await prisma.admin.update({
            where: { id: parseInt(id) },
            data: {
                name,
                email,
                role,
                status,
                company_id: company_id ? parseInt(company_id) : null
            }
        });

        delete admin.password;
        res.json(admin);
    },

    // Delete admin
    deleteAdmin: async (req, res) => {
        const { id } = req.params;

        await prisma.admin.delete({
            where: { id: parseInt(id) }
        });

        res.json({ message: 'Admin deleted successfully' });
    }
};

module.exports = adminController; 