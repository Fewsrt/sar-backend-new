const prisma = require('../config/db');

// Get all leave requests
const getAllLeaveRequests = async () => {
  return await prisma.leaveRequest.findMany({
    include: {
      employee: true
    }
  });
};

// Get leave request by ID
const getLeaveRequestById = async (id) => {
  return await prisma.leaveRequest.findUnique({
    where: { id: parseInt(id) },
    include: {
      employee: true
    }
  });
};

// Get leave requests by employee ID
const getLeaveRequestsByEmployeeId = async (employeeId) => {
  return await prisma.leaveRequest.findMany({
    where: { employee_id: parseInt(employeeId) },
    include: {
      employee: true
    }
  });
};

// Create leave request
const createLeaveRequest = async (data) => {
  return await prisma.leaveRequest.create({
    data: {
      employee_id: parseInt(data.employee_id),
      start_date: new Date(data.start_date),
      end_date: new Date(data.end_date),
      leave_type: data.leave_type,
      reason: data.reason,
      status: data.status || 'PENDING'
    },
    include: {
      employee: true
    }
  });
};

// Update leave request
const updateLeaveRequest = async (id, data) => {
  return await prisma.leaveRequest.update({
    where: { id: parseInt(id) },
    data: {
      start_date: data.start_date ? new Date(data.start_date) : undefined,
      end_date: data.end_date ? new Date(data.end_date) : undefined,
      leave_type: data.leave_type,
      reason: data.reason,
      status: data.status
    }
  });
};

// Delete leave request
const deleteLeaveRequest = async (id) => {
  return await prisma.leaveRequest.delete({
    where: { id: parseInt(id) }
  });
};

module.exports = {
  getAllLeaveRequests,
  getLeaveRequestById,
  getLeaveRequestsByEmployeeId, 
  createLeaveRequest,
  updateLeaveRequest,
  deleteLeaveRequest
};
