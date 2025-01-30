const leaveRequestModel = require('../../models/leaveRequest');

// Get all leave requests
const getAllLeaveRequests = async (req, res) => {
  try {
    const leaveRequests = await leaveRequestModel.getAllLeaveRequests();
    res.json(leaveRequests);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch leave requests' });
  }
};

// Get leave request by ID
const getLeaveRequestById = async (req, res) => {
  try {
    const leaveRequest = await leaveRequestModel.getLeaveRequestById(req.params.id);
    if (!leaveRequest) {
      return res.status(404).json({ error: 'Leave request not found' });
    }
    res.json(leaveRequest);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch leave request' });
  }
};

// Get leave requests by employee ID
const getLeaveRequestsByEmployeeId = async (req, res) => {
  try {
    const leaveRequests = await leaveRequestModel.getLeaveRequestsByEmployeeId(req.params.employeeId);
    res.json(leaveRequests);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch employee leave requests' });
  }
};

// Create leave request
const createLeaveRequest = async (req, res) => {
  try {
    const leaveRequest = await leaveRequestModel.createLeaveRequest(req.body);
    res.status(201).json(leaveRequest);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create leave request' });
  }
};

// Update leave request
const updateLeaveRequest = async (req, res) => {
  try {
    const leaveRequest = await leaveRequestModel.updateLeaveRequest(req.params.id, req.body);
    res.json(leaveRequest);
  } catch (error) {
    res.status(500).json({ error: 'Unable to update leave request' });
  }
};

// Delete leave request
const deleteLeaveRequest = async (req, res) => {
  try {
    await leaveRequestModel.deleteLeaveRequest(req.params.id);
    res.json({ message: 'Leave request deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Unable to delete leave request' });
  }
};

module.exports = {
  getAllLeaveRequests,
  getLeaveRequestById,
  getLeaveRequestsByEmployeeId,
  createLeaveRequest,
  updateLeaveRequest,
  deleteLeaveRequest
};
