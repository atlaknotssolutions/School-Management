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

// For endpoints scoped by studentId query param - students/parents can only see their own
const scopeStudentQuery = (req, res, next) => {
  if (req.user.role === "student") req.query.studentId = req.user.refId;
  if (req.user.role === "parent" && req.query.studentId) {
    if (!(req.user.linkedStudentIds || []).includes(req.query.studentId)) {
      return res.status(403).json({ success: false, message: "Not your linked student" });
    }
  }
  next();
};

module.exports = { verifyToken, authorizeRoles, scopeStudentQuery };
