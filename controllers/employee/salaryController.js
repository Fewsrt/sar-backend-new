const salaryModel = require('../../models/salary');

// Get all salaries
const getAllSalaries = async (req, res) => {
  try {
    const salaries = await salaryModel.getAllSalaries();
    res.json(salaries);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch salaries' });
  }
};

// Get salary by ID
const getSalaryById = async (req, res) => {
  try {
    const salary = await salaryModel.getSalaryById(req.params.id);
    if (!salary) {
      return res.status(404).json({ error: 'Salary not found' });
    }
    res.json(salary);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch salary' });
  }
};

// Get salaries by employee ID
const getSalariesByEmployeeId = async (req, res) => {
  try {
    const salaries = await salaryModel.getSalariesByEmployeeId(req.params.employeeId);
    res.json(salaries);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch employee salaries' });
  }
};

// Create salary
const createSalary = async (req, res) => {
  try {
    const salary = await salaryModel.createSalary(req.body);
    res.status(201).json(salary);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create salary' });
  }
};

// Update salary
const updateSalary = async (req, res) => {
  try {
    const salary = await salaryModel.updateSalary(req.params.id, req.body);
    res.json(salary);
  } catch (error) {
    res.status(500).json({ error: 'Unable to update salary' });
  }
};

// Delete salary
const deleteSalary = async (req, res) => {
  try {
    await salaryModel.deleteSalary(req.params.id);
    res.json({ message: 'Salary deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Unable to delete salary' });
  }
};

module.exports = {
  getAllSalaries,
  getSalaryById,
  getSalariesByEmployeeId,
  createSalary,
  updateSalary,
  deleteSalary
};
