// const socketIo = require('socket.io');

// const createSocketServer = (server) => {
//     const io = socketIo(server, {
//         cors: {
//             origin: ['https://liff.line.me/2006519613-MpmgYvkZ', 'https://fewmanager-8adc1.firebaseapp.com'],
//             methods: ['GET', 'POST'],
//             credentials: true // อนุญาตให้ส่ง cookies
//         }
//     });

//     // ตั้งค่าการเชื่อมต่อ
//     io.on('connection', async (socket) => {
//         console.log('A user connected:', socket.id);

//         // ดึงข้อมูลสถานะออนไลน์จากบริการ
//         // คุณสามารถเรียกใช้ฟังก์ชันที่เกี่ยวข้องที่นี่

//         // เมื่อมีการตัดการเชื่อมต่อ
//         socket.on('disconnect', () => {
//             console.log('User disconnected:', socket.id);
//         });
//     });

//     return io; // ส่งคืน instance ของ io
// };

// module.exports = createSocketServer; 