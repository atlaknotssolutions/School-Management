const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/paymentController");
const { verifyToken, authorizeRoles, scopeStudentQuery } = require("../middleware/auth");

router.use(verifyToken);
router.post("/", authorizeRoles("admin", "student", "parent"), ctrl.recordPayment);
router.get("/", authorizeRoles("admin", "student", "parent"), scopeStudentQuery, ctrl.getPayments);

module.exports = router;
