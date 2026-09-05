const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/enquiryController");
const { verifyToken, authorizeRoles } = require("../middleware/auth");

router.use(verifyToken, authorizeRoles("admin", "teacher"));

router.post("/", ctrl.createEnquiry);
router.get("/", ctrl.getEnquiries);
router.put("/:id", ctrl.updateEnquiry);
router.delete("/:id", ctrl.deleteEnquiry);

module.exports = router;
