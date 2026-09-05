const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/examController");
const { verifyToken, authorizeRoles, scopeStudentQuery } = require("../middleware/auth");

router.use(verifyToken);
router.post("/", authorizeRoles("teacher", "admin"), ctrl.enterMarks);
router.get("/report-card", authorizeRoles("admin", "teacher", "student", "parent"), scopeStudentQuery, ctrl.getReportCard);

module.exports = router;
