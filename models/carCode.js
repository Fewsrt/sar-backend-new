const prisma = require('../config/db');

// ฟังก์ชันแปลงปีเป็นตัวอักษร
function getYearCode(year) {
    const yearOffset = year - 2024;
    const firstChar = Math.floor(yearOffset / 26);
    const secondChar = yearOffset % 26;
    
    if (firstChar === 0) {
        return String.fromCharCode(65 + secondChar);
    } else {
        return String.fromCharCode(65 + firstChar - 1) + 
               String.fromCharCode(65 + secondChar);
    }
}

// ฟังก์ชันแปลงเดือนเป็นตัวอักษร
function getMonthCode(month) {
    return String.fromCharCode(64 + month);
}

// ฟังก์ชันสร้างรหัสรถยนต์
async function generateCarCode(vehicleType = 'CAR') {
    try {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1;

        // กำหนด prefix ตามประเภทยานพาหนะ
        const typePrefix = vehicleType === 'CAR' ? '' : 'M';
        const yearCode = getYearCode(year);
        const monthCode = getMonthCode(month);
        const prefix = `${typePrefix}${yearCode}${monthCode}`;

        // หาลำดับล่าสุดแยกตามประเภท
        const latestVehicle = await prisma.car.findFirst({
            where: {
                year: year,
                month: month,
                vehicle_type: vehicleType
            },
            orderBy: {
                car_code: 'desc'
            }
        });

        let nextNumber = 1;
        if (latestVehicle) {
            const currentNumber = parseInt(latestVehicle.car_code.slice(-4));
            nextNumber = currentNumber + 1;
        }

        // สร้างรหัสใหม่
        const carCode = `${prefix}${String(nextNumber).padStart(4, '0')}`;

        return {
            car_code: carCode,
            year: year,
            month: month,
            vehicle_type: vehicleType
        };
    } catch (error) {
        console.error('Error generating code:', error);
        throw new Error('Failed to generate code');
    }
}

module.exports = {
    generateCarCode
}; 