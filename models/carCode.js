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
async function generateCarCode(year, month) {
    try {
        const yearCode = getYearCode(year);
        const monthCode = getMonthCode(month);
        const prefix = `${yearCode}${monthCode}`;

        // หาลำดับล่าสุดของเดือนนั้นๆ
        const latestCar = await prisma.car.findFirst({
            where: {
                year: year,
                month: month
            },
            orderBy: {
                car_code: 'desc'
            }
        });

        let nextNumber = 1;
        if (latestCar) {
            const currentNumber = parseInt(latestCar.car_code.slice(-4));
            nextNumber = currentNumber + 1;
        }

        // สร้างรหัสใหม่
        const carCode = `${prefix}${String(nextNumber).padStart(4, '0')}`;

        return {
            success: true,
            car_code: carCode,
            prefix: prefix,
            sequence: nextNumber,
            year: year,
            month: month
        };
    } catch (error) {
        console.error('Error generating car code:', error);
        throw new Error('Failed to generate car code');
    }
}

module.exports = {
    generateCarCode
}; 