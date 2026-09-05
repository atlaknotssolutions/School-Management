const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/invoiceController");
const { verifyToken, authorizeRoles, scopeStudentQuery } = require("../middleware/auth");

router.use(verifyToken);
router.post("/", authorizeRoles("admin"), ctrl.createInvoice);
router.get("/", authorizeRoles("admin", "student", "parent"), scopeStudentQuery, ctrl.getInvoices);

module.exports = router;
