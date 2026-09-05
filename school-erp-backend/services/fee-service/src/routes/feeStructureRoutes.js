const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/feeStructureController");
const { verifyToken, authorizeRoles } = require("../middleware/auth");

router.use(verifyToken);
router.post("/", authorizeRoles("admin"), ctrl.createStructure);
router.get("/", authorizeRoles("admin", "teacher", "student", "parent"), ctrl.getStructures);
router.delete("/:id", authorizeRoles("admin"), ctrl.deleteStructure);

module.exports = router;
