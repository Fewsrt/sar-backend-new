const prisma = require('../config/db');

// Get all salaries
const getAllSalaries = async () => {
  return await prisma.salary.findMany({
    include: {
      employee: true
    }
  });
};

// Get salary by ID
const getSalaryById = async (id) => {
  return await prisma.salary.findUnique({
    where: { id: parseInt(id) },
    include: {
      employee: true
    }
  });
};

// Get salaries by employee ID
const getSalariesByEmployeeId = async (employeeId) => {
  return await prisma.salary.findMany({
    where: { employee_id: parseInt(employeeId) },
    include: {
      employee: true
    }
  });
};

// Create salary
const createSalary = async (data) => {
  return await prisma.salary.create({
    data: {
      employee_id: parseInt(data.employee_id),
      base_salary: parseFloat(data.base_salary),
      bonus: data.bonus ? parseFloat(data.bonus) : null,
      deductions: data.deductions ? parseFloat(data.deductions) : null,
      total_salary: parseFloat(data.total_salary),
      pay_date: new Date(data.pay_date)
    },
    include: {
      employee: true
    }
  });
};

// Update salary
const updateSalary = async (id, data) => {
  return await prisma.salary.update({
    where: { id: parseInt(id) },
    data: {
      base_salary: data.base_salary ? parseFloat(data.base_salary) : undefined,
      bonus: data.bonus ? parseFloat(data.bonus) : undefined,
      deductions: data.deductions ? parseFloat(data.deductions) : undefined,
      total_salary: data.total_salary ? parseFloat(data.total_salary) : undefined,
      pay_date: data.pay_date ? new Date(data.pay_date) : undefined
    }
  });
};

// Delete salary
const deleteSalary = async (id) => {
  return await prisma.salary.delete({
    where: { id: parseInt(id) }
  });
};

const calculateMonthlySalary = async (employeeId, month, year) => {
    // ดึงข้อมูลการลงเวลาทั้งเดือน
    const attendances = await prisma.attendance.findMany({
        where: {
            employee_id: employeeId,
            check_in_time: {
                gte: new Date(year, month - 1, 1),
                lt: new Date(year, month, 1)
            }
        }
    });

    let totalDeduction = 0;
    let halfDayCount = 0;

    // คำนวณค่าปรับทั้งหมด
    attendances.forEach(attendance => {
        totalDeduction += attendance.deduction_amount;
        if (attendance.is_half_day_absent) {
            halfDayCount++;
        }
    });

    // คำนวณเงินเดือนสุทธิ
    const employee = await prisma.employee.findUnique({
        where: { id: employeeId }
    });

    const baseSalary = employee.base_salary;
    const dailyRate = baseSalary / 30; // คิดเป็นรายวัน
    const halfDayDeduction = (dailyRate / 2) * halfDayCount;

    return {
        baseSalary,
        lateDeduction: totalDeduction,
        halfDayDeduction,
        netSalary: baseSalary - totalDeduction - halfDayDeduction
    };
};

module.exports = {
  getAllSalaries,
  getSalaryById,
  getSalariesByEmployeeId,
  createSalary,
  updateSalary,
  deleteSalary,
  calculateMonthlySalary
};
