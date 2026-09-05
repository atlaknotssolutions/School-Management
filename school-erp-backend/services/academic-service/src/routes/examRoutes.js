const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/examController");
const {
  verifyToken,
  authorizeRoles,
  scopeStudentQuery,
} = require("../middleware/auth");

router.use(verifyToken);
router.post("/", authorizeRoles("admin"), ctrl.createExam);
router.get(
  "/",
  authorizeRoles("admin", "teacher", "student", "parent"),
  ctrl.getExams,
);
router.put("/:id", authorizeRoles("admin"), ctrl.updateExam);
router.delete("/:id", authorizeRoles("admin"), ctrl.deleteExam);

module.exports = router;
