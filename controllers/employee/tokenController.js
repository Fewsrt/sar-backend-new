// controllers/tokenController.js
const jwt = require('jsonwebtoken');
const { storeRefreshToken, getRefreshToken } = require('../../models/userModel');

// Generate Access Token
const generateAccessToken = (user) => {
  // ตั้งค่า expiresIn เป็น 30 วินาที
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '12h' });
};


// Generate Refresh Token
const generateRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};

// Refresh Access Token
const refreshAccessToken = async (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(401).json({ error: 'Refresh Token is required' });
  }

  try {
    const user = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    let storedToken;

    // ตรวจสอบว่าเป็นพนักงานหรือแอดมิน
    if (user.employee_code) {
      storedToken = await getRefreshToken(user.employee_code);
      if (!storedToken) {
        return res.status(401).json({ error: 'No Refresh Token found for employee. Please log in again.' });
      }
      if (storedToken.token !== token) {
        return res.status(403).json({ error: 'Invalid Refresh Token for employee' });
      }
    } else if (user.admin_id) {
      storedToken = await getRefreshToken(null, user.admin_id); // ฟังก์ชันนี้ต้องรองรับการค้นหาตาม admin_id
      if (!storedToken) {
        return res.status(401).json({ error: 'No Refresh Token found for admin. Please log in again.' });
      }
      if (storedToken.token !== token) {
        return res.status(403).json({ error: 'Invalid Refresh Token for admin' });
      }
    } else {
      return res.status(403).json({ error: 'Invalid user type' });
    }

    // Create new Access Token
    const accessToken = generateAccessToken({
      employee_code: user.employee_code,
      admin_id: user.admin_id, // เพิ่ม admin_id ถ้ามี
      full_name: user.full_name,
      position: user.position,
      role: user.role
    });

    res.json({ accessToken });
  } catch (err) {
    console.error('Error while refreshing access token:', err);
    return res.status(403).json({ error: 'Invalid Refresh Token' });
  }
};


module.exports = {
  generateAccessToken,
  generateRefreshToken,
  refreshAccessToken,
};
