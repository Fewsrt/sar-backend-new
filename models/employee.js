// models/employee.js
const prisma = require('../config/db');
const bcrypt = require('bcryptjs');

// Get list of employees
const getEmployees = async () => {
  return await prisma.employee.findMany({
    include: {
      branch: true,
      followUps: true,
      sale: true,
      maintenance: true,
      carInspection: true,
      carAssociatedEntities: true,
      attendance: true,
      
    },
  });
};

// Get employee by ID
const getEmployeeById = async (employeeId) => {
  return await prisma.employee.findUnique({
    where: { employee_id: parseInt(employeeId) },
    include: {
      branch: true,
      followUps: true,
      sale: true,
      maintenance: true,
      carInspection: true,
      carAssociatedEntities: true,
      attendance: true,
      work_shift: true,
    },
  });
};

// Create a new employee
const createEmployee = async (data) => {
  return await prisma.employee.create({ data });
};

// Find employee by email
const findEmployeeByEmail = async (email) => {
  return await prisma.employee.findUnique({
    where: { email },
    include: {
      work_shift: true
    }
  });
};

// Update password and set isFirstLogin to false
const updatePassword = async (email, newPassword) => {
  const hashedPassword = await bcrypt.hash(newPassword, 8);
  return await prisma.employee.update({
    where: { email },
    data: {
      password: hashedPassword,
      isFirstLogin: false,
    },
  });
};

// Update role of employee
const updateRole = async (email, newRole) => {
  return await prisma.employee.update({
    where: { email },
    data: {
      role: newRole,
    },
  });
};

// Update employee by ID
const updateEmployee = async (employeeId, data) => {
  return await prisma.employee.update({
    where: { employee_id: parseInt(employeeId) },
    data,
  });
};

// Delete employee by ID
const deleteEmployee = async (employeeId) => {
  return await prisma.$transaction(async (prisma) => {
    // 1. Delete followUps
    await prisma.followUp.deleteMany({
      where: { employee_id: parseInt(employeeId) }
    });

    // 2. Delete sales records
    await prisma.sale.deleteMany({
      where: { salesperson_id: parseInt(employeeId) }
    });

    // 3. Delete maintenance records
    await prisma.maintenance.deleteMany({
      where: { employee_id: parseInt(employeeId) }
    });

    // 4. Delete car inspection records
    await prisma.carInspection.deleteMany({
      where: { inspector_id: parseInt(employeeId) }
    });

    // 5. Update cars to remove employee reference
    await prisma.carAssociatedEntities.updateMany({
      where: { salesperson_id: parseInt(employeeId) },
      data: { salesperson_id: null }
    });

    // 6. Delete attendance records
    await prisma.attendance.deleteMany({
      where: { employee_code: (
        await prisma.employee.findUnique({
          where: { employee_id: parseInt(employeeId) },
          select: { employee_code: true }
        })
      ).employee_code }
    });

    // 7. Delete refresh token
    await prisma.refreshToken.deleteMany({
      where: { 
        employee_code: (
          await prisma.employee.findUnique({
            where: { employee_id: parseInt(employeeId) },
            select: { employee_code: true }
          })
        ).employee_code 
      }
    });

    // 8. Finally delete the employee
    return await prisma.employee.delete({
      where: { employee_id: parseInt(employeeId) }
    });
  });
};

// Get last employee number by prefix
const getLastEmployeeNumber = async (prefix) => {
  const employees = await prisma.employee.findMany({
    where: {
      employee_code: {
        startsWith: `${prefix}-`
      }
    },
    orderBy: {
      employee_code: 'desc'
    },
    take: 1
  });

  if (employees.length === 0) {
    return `${prefix}-001`;
  }

  const lastCode = employees[0].employee_code;
  const lastNumber = parseInt(lastCode.split('-')[1]);
  const newNumber = (lastNumber + 1).toString().padStart(3, '0');
  return `${prefix}-${newNumber}`;
};

// Reset password
const resetPassword = async (employeeId) => {
  const defaultPassword = 'Sarerp123';
  const hashedPassword = await bcrypt.hash(defaultPassword, 8);
  
  return await prisma.employee.update({
    where: { employee_id: parseInt(employeeId) },
    data: {
      password: hashedPassword,
      isFirstLogin: true
    }
  });
};

// Reset LINE UUID
const resetLineUUID = async (employeeId) => {
  return await prisma.employee.update({
    where: { employee_id: parseInt(employeeId) },
    data: {
      line_uuid: null
    }
  });
};

module.exports = {
  getEmployees,
  getEmployeeById,
  createEmployee,
  findEmployeeByEmail,
  updatePassword,
  updateRole,
  updateEmployee,
  deleteEmployee,
  getLastEmployeeNumber,
  resetPassword,
  resetLineUUID
};
