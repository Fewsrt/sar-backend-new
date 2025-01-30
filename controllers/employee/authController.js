const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { findEmployeeByEmail } = require('../../models/employee');
const { generateAccessToken, generateRefreshToken } = require('./tokenController');
const { storeRefreshToken, getRefreshToken } = require('../../models/userModel');
const prisma = require('../../config/db');

const login = async (req, res) => {
    const start = process.hrtime();
    const { email, password } = req.body;

    try {
        const employee = await findEmployeeByEmail(email);

        if (!employee) {
            const end = process.hrtime(start);
            console.log(`Login failed (invalid credentials) after ${end[0]}s ${end[1] / 1000000}ms`);
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        if (!employee.password || typeof employee.password !== 'string') {
            const end = process.hrtime(start);
            console.log(`Login failed (invalid data) after ${end[0]}s ${end[1] / 1000000}ms`);
            return res.status(500).json({ error: 'Invalid employee data' });
        }

        const [isPasswordValid, accessToken, refreshToken] = await Promise.all([
            bcrypt.compare(password, employee.password),
            generateAccessToken({
                employee_id: employee.employee_id,
                employee_code: employee.employee_code,
                full_name: employee.full_name,
                position: employee.position,
                role: employee.role
            }),
            generateRefreshToken({
                employee_code: employee.employee_code
            })
        ]);

        if (!isPasswordValid) {
            const end = process.hrtime(start);
            console.log(`Login failed (invalid password) after ${end[0]}s ${end[1] / 1000000}ms`);
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        if (employee.isFirstLogin) {
            const end = process.hrtime(start);
            console.log(`Login failed (first login) after ${end[0]}s ${end[1] / 1000000}ms`);
            return res.status(403).json({ message: 'Please change your password on first login' });
        }

        // Store refresh token in database
        await storeRefreshToken(employee.employee_code, null, refreshToken);

        const end = process.hrtime(start);
        console.log(`Login successful after ${end[0]}s ${end[1] / 1000000}ms`);

        res.json({
            accessToken,
            refreshToken,
            employee: {
                employee_id: employee.employee_id,
                employee_code: employee.employee_code,
                full_name: employee.full_name,
                position: employee.position,
                role: employee.role
            }
        });

    } catch (error) {
        const end = process.hrtime(start);
        console.error(`Login error after ${end[0]}s ${end[1] / 1000000}ms:`, error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Login with LINE
const generateLineToken = async (req, res) => {
    try {
        const { line_uuid } = req.body;

        // Find employee by LINE UUID with branch information
        const employee = await prisma.employee.findFirst({
            where: { line_uuid },
            include: {
                branch: {
                    select: {
                        branch_id: true,
                        branch_name: true,
                        latitude: true,
                        longitude: true,
                        radius: true,
                        address: true,
                        province: {
                            select: {
                                name_th: true
                            }
                        },
                        district: {
                            select: {
                                name_th: true
                            }
                        },
                        subdistrict: {
                            select: {
                                name_th: true
                            }
                        }
                    }
                }
            }
        });

        if (!employee) {
            return res.status(404).json({ message: 'Employee not found with this LINE account' });
        }

        // Generate tokens
        const accessToken = generateAccessToken({
            employee_id: employee.employee_id,
            employee_code: employee.employee_code,
            full_name: employee.full_name,
            position: employee.position,
            role: employee.role,
            branch_id: employee.branch_id // เพิ่ม branch_id ใน token
        });

        const refreshToken = generateRefreshToken({
            employee_code: employee.employee_code
        });

        // Store refresh token
        await storeRefreshToken(employee.employee_code, null, refreshToken);

        // จัดรูปแบบข้อมูลที่จะส่งกลับ
        const formattedBranch = employee.branch ? {
            ...employee.branch,
            full_address: `${employee.branch.address || ''} ${employee.branch.subdistrict?.name_th || ''} ${employee.branch.district?.name_th || ''} ${employee.branch.province?.name_th || ''}`
        } : null;

        res.json({
            accessToken,
            refreshToken,
            employee: {
                employee_id: employee.employee_id,
                employee_code: employee.employee_code,
                full_name: employee.full_name,
                position: employee.position,
                role: employee.role,
                branch: formattedBranch // เพิ่มข้อมูลสาขา
            }
        });
    } catch (error) {
        console.error('LINE authentication failed:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Renew Access Token
const renewAccessToken = async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(401).json({
            success: false,
            message: 'Refresh token is required'
        });
    }

    try {
        // Verify refresh token
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

        // Get stored refresh token
        const storedToken = await getRefreshToken(decoded.employee_code);

        if (!storedToken || storedToken.token !== refreshToken) {
            return res.status(401).json({
                success: false,
                message: 'Invalid refresh token'
            });
        }

        // Get employee data
        const employee = await prisma.employee.findFirst({
            where: { employee_code: decoded.employee_code }
        });

        // Check for superadmin
        const admin = await prisma.admin.findUnique({
            where: { username: decoded.employee_code }
        });

        if (!employee && !admin) {
            return res.status(404).json({
                success: false,
                message: 'Employee or Admin not found'
            });
        }

        // Generate new access token
        const newAccessToken = generateAccessToken({
            employee_id: employee ? employee.employee_id : admin.admin_id,
            employee_code: employee ? employee.employee_code : admin.username,
            full_name: employee ? employee.full_name : admin.full_name,
            position: employee ? employee.position : 'Superadmin',
            role: employee ? employee.role : 'superadmin'
        });

        res.json({
            success: true,
            accessToken: newAccessToken,
            employee: employee ? {
                employee_id: employee.employee_id,
                employee_code: employee.employee_code,
                full_name: employee.full_name,
                position: employee.position,
                role: employee.role
            } : {
                admin_id: admin.admin_id,
                username: admin.username,
                full_name: admin.full_name,
                position: 'Superadmin',
                role: 'superadmin'
            }
        });

    } catch (error) {
        console.error('Token renewal error:', error);

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Refresh token has expired'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Failed to renew access token'
        });
    }
};

async function logout(req, res) {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(200).json({ 
                success: true, 
                message: 'Logged out successfully' 
            });
        }

        // ถอดรหัส token เพื่อดูว่าเป็น admin หรือ employee
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

        if (decoded.admin_id) {
            // ถ้าเป็น admin
            await prisma.refreshToken.deleteMany({
                where: { admin_id: decoded.admin_id }
            });
        } else if (decoded.employee_code) {
            // ถ้าเป็น employee
            await prisma.refreshToken.deleteMany({
                where: { employee_code: decoded.employee_code }
            });
        }

        // ลบ cookie
        res.clearCookie('refreshToken');
        
        return res.status(200).json({
            success: true,
            message: 'Logged out successfully'
        });

    } catch (error) {
        console.error('Logout error:', error);
        return res.status(200).json({ 
            success: true, 
            message: 'Logged out successfully' 
        });
    }
}

const loginSuperAdmin = async (req, res) => {
    const { username, password } = req.body;

    try {
        const admin = await prisma.admin.findUnique({ where: { username } });
        if (!admin) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const accessToken = generateAccessToken({
            admin_id: admin.id,
            role: admin.role
        });
        const refreshToken = generateRefreshToken({
            admin_id: admin.id
        });

        // Store refresh token in database
        await storeRefreshToken(null, admin.id, refreshToken);

        res.json({
            accessToken,
            refreshToken,
            employee: {
                admin_id: admin.id,
                role: admin.role
            }
        });
    } catch (error) {
        console.error('Login Super Admin error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    login,
    generateLineToken,
    renewAccessToken,
    logout,
    loginSuperAdmin
};
