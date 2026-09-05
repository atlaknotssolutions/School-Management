const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/attendanceController");
const { verifyToken, authorizeRoles, scopeStudentQuery } = require("../middleware/auth");

router.use(verifyToken);
router.post("/mark", authorizeRoles("teacher", "admin"), ctrl.markAttendance);
router.get("/", authorizeRoles("admin", "teacher", "student", "parent"), scopeStudentQuery, ctrl.getAttendance);

module.exports = router;
