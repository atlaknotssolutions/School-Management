const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/homeworkController");
const { verifyToken, authorizeRoles } = require("../middleware/auth");

router.use(verifyToken);
router.post("/", authorizeRoles("teacher", "admin"), ctrl.createHomework);
router.get("/", authorizeRoles("admin", "teacher", "student", "parent"), ctrl.getHomework);
router.put("/:id", authorizeRoles("teacher", "admin"), ctrl.updateHomework);
router.delete("/:id", authorizeRoles("teacher", "admin"), ctrl.deleteHomework);

module.exports = router;
