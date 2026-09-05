const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/authController");
const { verifyToken, authorizeRoles } = require("../middleware/auth");

router.post("/register", ctrl.register);
router.post("/login", ctrl.login);
router.post("/refresh-token", ctrl.refreshToken);

router.get("/me", verifyToken, ctrl.getMe);
router.post("/change-password", verifyToken, ctrl.changePassword);
router.get("/verify", verifyToken, ctrl.verify);

router.get("/users", verifyToken, authorizeRoles("admin"), ctrl.listUsers);
router.patch("/users/:id/status", verifyToken, authorizeRoles("admin"), ctrl.updateUserStatus);
router.delete("/users/:id", verifyToken, authorizeRoles("admin"), ctrl.deleteUser);

module.exports = router;
