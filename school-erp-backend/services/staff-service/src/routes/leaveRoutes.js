const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/leaveController");
const { verifyToken, authorizeRoles } = require("../middleware/auth");

router.use(verifyToken);

router.post("/", authorizeRoles("teacher", "admin"), ctrl.applyLeave);
router.get("/", authorizeRoles("admin", "teacher"), ctrl.getLeaves);
router.patch("/:id/status", authorizeRoles("admin"), ctrl.updateLeaveStatus);

module.exports = router;
