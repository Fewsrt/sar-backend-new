const prisma = require('../../config/db');
const { AppError } = require('../../middleware/errorHandler');

const companyController = {
    // Get all companies
    getAllCompanies: async (req, res) => {
        const companies = await prisma.company.findMany({
            orderBy: { created_at: 'desc' }
        });
        res.json(companies);
    },

    // Create new company
    createCompany: async (req, res) => {
        const { company_code, company_name, contact_person, phone, email } = req.body;

        const existingCompany = await prisma.company.findUnique({
            where: { company_code }
        });

        if (existingCompany) {
            throw new AppError('Company code already exists', 400);
        }

        const company = await prisma.company.create({
            data: {
                company_code,
                company_name,
                contact_person,
                phone,
                email
            }
        });

        res.status(201).json(company);
    },

    // Update company
    updateCompany: async (req, res) => {
        const { id } = req.params;
        const { company_name, contact_person, phone, email, status } = req.body;

        const company = await prisma.company.update({
            where: { id: parseInt(id) },
            data: {
                company_name,
                contact_person,
                phone,
                email,
                status
            }
        });

        res.json(company);
    },

    // Delete company
    deleteCompany: async (req, res) => {
        const { id } = req.params;

        await prisma.company.delete({
            where: { id: parseInt(id) }
        });

        res.json({ message: 'Company deleted successfully' });
    }
};

module.exports = companyController; 