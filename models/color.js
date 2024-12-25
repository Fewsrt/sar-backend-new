const prisma = require('../config/db.js');

// ฟังก์ชันสำหรับสร้างสีรถใหม่ (Create)
async function createColor(data) {
    return await prisma.color.create({ data });
}

// ฟังก์ชันสำหรับค้นหาสีรถจาก ID (Read)
async function findColorById(color_id) {
    return await prisma.color.findUnique({ where: { color_id } });
}

// ฟังก์ชันสำหรับอัพเดทสีรถ (Update)
async function updateColorById(color_id, data) {
    return await prisma.color.update({ where: { color_id }, data });
}

// ฟังก์ชันสำหรับลบสีรถ (Delete)
async function deleteColorById(color_id) {
    return await prisma.color.delete({ where: { color_id } });
}

// ฟังก์ชันสำหรับดึงข้อมูลสีทั้งหมด
async function findAllColors() {
    return await prisma.color.findMany();
}

module.exports = { 
    createColor, 
    findColorById, 
    updateColorById, 
    deleteColorById,
    findAllColors 
}; 