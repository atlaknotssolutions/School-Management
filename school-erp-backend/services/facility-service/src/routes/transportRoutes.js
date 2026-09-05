const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/transportController");
const { verifyToken, authorizeRoles } = require("../middleware/auth");

router.use(verifyToken);
router.post("/", authorizeRoles("admin"), ctrl.createRoute);
router.get("/", authorizeRoles("admin", "teacher", "student", "parent"), ctrl.getRoutes);
router.patch("/:id/location", authorizeRoles("admin", "teacher"), ctrl.updateLocation);
router.patch("/:id/assign", authorizeRoles("admin"), ctrl.assignStudent);

module.exports = router;
