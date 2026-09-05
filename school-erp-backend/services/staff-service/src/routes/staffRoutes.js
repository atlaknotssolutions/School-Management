const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/staffController");
const { verifyToken, authorizeRoles, restrictToOwnStaff } = require("../middleware/auth");

router.use(verifyToken);

router.post("/", authorizeRoles("admin"), ctrl.createStaff);
router.get("/", authorizeRoles("admin", "teacher"), ctrl.getStaff);
router.get("/:id", restrictToOwnStaff((req) => req.params.id), ctrl.getStaffById);
router.put("/:id", authorizeRoles("admin"), ctrl.updateStaff);
router.delete("/:id", authorizeRoles("admin"), ctrl.deleteStaff);

module.exports = router;
