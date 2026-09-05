const jwt = require("jsonwebtoken");

const generateAccessToken = (user) =>
  jwt.sign(
    { id: user._id, role: user.role, email: user.email, name: user.name, refId: user.refId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
  );

const generateRefreshToken = (user) =>
  jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
  });

module.exports = { generateAccessToken, generateRefreshToken };
