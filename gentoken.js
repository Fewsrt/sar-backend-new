const jwt = require('jsonwebtoken');

const employee = {
    employee_code: "EMP001",
    full_name: "John Doe",
    position: "Developer"
};

const secretKey = "ZWcQfChme9QE4LA6f3-UGM_6iS-M973SPGzQqthCn3FbIIHxSgsfSdq6y76qdApG31HHAePP36FtGJCVnP1uKA"; // Secret Key ที่คุณให้มา
const token = jwt.sign(employee, secretKey, { expiresIn: '1h' }); // Token มีอายุการใช้งาน 1 ชั่วโมง

console.log("Generated Token:", token);
