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
    const storedToken = await getRefreshToken(user.employee_code);

    if (!storedToken) {
      // ถ้าไม่มี Refresh Token ในระบบ ให้แจ้งเตือนให้ผู้ใช้ login ใหม่
      return res.status(401).json({ error: 'No Refresh Token found. Please log in again.' });
    }

    if (storedToken.token !== token) {
      return res.status(403).json({ error: 'Invalid Refresh Token' });
    }

    // Create new Access Token
    const accessToken = generateAccessToken({
      employee_code: user.employee_code,
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
