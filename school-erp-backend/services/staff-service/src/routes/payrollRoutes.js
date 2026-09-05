const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/payrollController");
const { verifyToken, authorizeRoles } = require("../middleware/auth");

router.use(verifyToken);

router.post("/", authorizeRoles("admin"), ctrl.generatePayroll);
router.get("/", authorizeRoles("admin", "teacher"), ctrl.getPayroll);
router.patch("/:id/pay", authorizeRoles("admin"), ctrl.markPaid);

module.exports = router;
