const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "No token provided" });
  }
  try {
    req.user = jwt.verify(header.split(" ")[1], process.env.JWT_SECRET);
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

const authorizeRoles = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return res.status(403).json({ success: false, message: "Access denied for this role" });
  }
  next();
};

// Restrict a student/parent to only their own record(s)
const restrictToOwnStudent = (getStudentIdFromReq) => (req, res, next) => {
  if (["admin", "teacher"].includes(req.user.role)) return next();
  const targetId = getStudentIdFromReq(req);
  if (req.user.role === "student" && req.user.refId === targetId) return next();
  if (req.user.role === "parent" && (req.user.linkedStudentIds || []).includes(targetId)) return next();
  return res.status(403).json({ success: false, message: "You can only access your own student record" });
};

module.exports = { verifyToken, authorizeRoles, restrictToOwnStudent };
