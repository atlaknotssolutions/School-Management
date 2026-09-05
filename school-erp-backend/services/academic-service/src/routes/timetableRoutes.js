const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/timetableController");
const { verifyToken, authorizeRoles } = require("../middleware/auth");

router.use(verifyToken);
router.post("/", authorizeRoles("admin"), ctrl.upsertTimetable);
router.get("/", authorizeRoles("admin", "teacher", "student", "parent"), ctrl.getTimetable);
router.delete("/:id", authorizeRoles("admin"), ctrl.deleteTimetable);

module.exports = router;
