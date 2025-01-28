const nodemailer = require('nodemailer');

// สร้าง transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sangaroonserver@gmail.com',
        pass: process.env.SMTP_PASS
    }
});

// ฟังก์ชันสำหรับ retry
async function retry(fn, retries = process.env.EMAIL_RETRY_ATTEMPTS || 3, delay = process.env.EMAIL_RETRY_DELAY || 1000) {
    try {
        return await fn();
    } catch (error) {
        if (retries <= 1) throw error;
        await new Promise(resolve => setTimeout(resolve, delay));
        return retry(fn, retries - 1, delay);
    }
}

// ฟังก์ชันสำหรับส่งอีเมลต้อนรับพนักงานใหม่
async function sendWelcomeEmail(employeeData) {
    const { email, full_name, employee_code } = employeeData;
    const defaultPassword = 'Sarerp123';
    const loginUrl = process.env.FRONTEND_URL;
    const lineQRCodeUrl = "https://qr-official.line.me/gs/M_087ricti_BW.png?oat_content=qr"; // URL รูป QR Code ของ LINE Official Account
    const lineOAUrl = "https://lin.ee/vnY4n1M"; // URL สำหรับเพิ่มเพื่อน LINE Official Account

    // HTML template
    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>ยินดีต้อนรับสู่ระบบ SARERP</title>
        </head>
        <body>
            <div style="font-family: 'Sarabun', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <img src="https://sangaroon.com/logo.png" alt="SARERP Logo" style="max-width: 200px; margin-bottom: 20px;">
                <h2 style="color: #333; margin-bottom: 20px;">ยินดีต้อนรับสู่ระบบ SAR ERP & HR</h2>
                <p style="color: #555;">เรียน คุณ${full_name},</p>
                <p style="color: #555;">บัญชีของคุณได้ถูกสร้างเรียบร้อยแล้ว โดยมีรายละเอียดดังนี้:</p>
                
                <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
                    <h3 style="color: #F97316; margin-top: 0;">ชื่อผู้ใช้งานสำหรับเข้าสู่ระบบ SAR ERP</h3>
                    <p style="margin: 5px 0;"><strong>รหัสพนักงาน:</strong> ${employee_code}</p>
                    <p style="margin: 5px 0;"><strong>อีเมล:</strong> ${email}</p>
                    <p style="margin: 5px 0;"><strong>รหัสผ่านเริ่มต้น:</strong> ${defaultPassword}</p>

                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${loginUrl}" 
                            style="background-color: #F97316; color: white; padding: 12px 25px; 
                              text-decoration: none; border-radius: 5px; display: inline-block;">
                            เข้าสู่ระบบ
                        </a>
                    </div>
                </div>

                <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
                    <h3 style="color: #00B900; margin-top: 0;">ขั้นตอนการลงทะเบียน LINE SAR HR</h3>
                    <p style="color: #555;">เพื่อรับการแจ้งเตือนและใช้งานระบบผ่าน LINE กรุณาทำตามขั้นตอนดังนี้:</p>
                    <ol style="color: #555;">
                        <li>เพิ่มเพื่อน LINE Official Account "SAR HR" โดยสแกน QR Code ด้านล่าง</li>
                        <li>กดปุ่ม "เข้าสู่ระบบ" และเลือกรหัสพนักงาน ${employee_code}</li>
                        <li>ระบบจะทำการลงทะเบียนและแจ้งผลกลับทาง LINE</li>
                    </ol>
                    
                    <div style="text-align: center; margin: 20px 0;">
                        <img src="${lineQRCodeUrl}" alt="LINE QR Code" style="max-width: 200px; margin-bottom: 15px;">
                        <br>
                        <a href="${lineOAUrl}" 
                           style="background-color: #00B900; color: white; padding: 12px 25px; 
                                  text-decoration: none; border-radius: 5px; display: inline-block;">
                            เพิ่มเพื่อน LINE OA
                        </a>
                    </div>
                </div>

                <p style="color: #666; font-size: 0.9em;">หากคุณมีปัญหาในการเข้าสู่ระบบหรือการลงทะเบียน LINE กรุณาติดต่อผู้ดูแลระบบ</p>
                
                <hr style="border: 1px solid #eee; margin: 20px 0;">
                <div style="color: #999; font-size: 0.8em;">
                    <p>อีเมลนี้ถูกส่งโดยอัตโนมัติ กรุณาอย่าตอบกลับ</p>
                    <p>© ${new Date().getFullYear()} SARERP. All rights reserved.</p>
                    <p>บริษัท แสงอรุณออโต้คาร์ จำกัด<br>
                    เลขที่ 54/6 หมู่ 2 ตำบลคอกกระบือ อำเภอเมืองสมุทรสาคร จังหวัดสมุทรสาคร</p>
                </div>
            </div>
        </body>
        </html>
    `;

    const mailOptions = {
        from: {
            name: "SAR ERP & HR System",
            address: "sangaroonserver@gmail.com"
        },
        to: email,
        subject: 'ยินดีต้อนรับสู่ระบบ SARERP',
        html: htmlContent,
        text: `ยินดีต้อนรับสู่ระบบ SARERP\n\n
               เรียน คุณ${full_name}\n
               บัญชีของคุณได้ถูกสร้างเรียบร้อยแล้ว\n
               รหัสพนักงาน: ${employee_code}\n
               อีเมล: ${email}\n
               รหัสผ่านเริ่มต้น: ${defaultPassword}\n
               
               เข้าสู่ระบบที่: ${loginUrl}\n\n
               
               ขั้นตอนการลงทะเบียน LINE Official Account:\n
               1. เพิ่มเพื่อน LINE OA "SARERP" ที่: ${lineOAUrl}\n
               2. พิมพ์ข้อความ "register ${employee_code}" ในแชท\n
               3. ระบบจะทำการลงทะเบียนและแจ้งผลกลับทาง LINE\n\n
               
               หากมีปัญหาในการเข้าสู่ระบบหรือการลงทะเบียน LINE กรุณาติดต่อผู้ดูแลระบบ`
    };

    try {
        await retry(async () => {
            await transporter.sendMail(mailOptions);
        });
        console.log('Welcome email sent successfully to:', email);
        return true;
    } catch (error) {
        console.error('Error sending welcome email:', error);
        throw error;
    }
}

module.exports = {
    sendWelcomeEmail
}; 