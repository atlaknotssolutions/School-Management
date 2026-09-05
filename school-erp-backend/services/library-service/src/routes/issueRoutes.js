const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/issueController");
const { verifyToken, authorizeRoles } = require("../middleware/auth");

router.use(verifyToken);
router.post("/issue", authorizeRoles("admin"), ctrl.issueBook);
router.patch("/:id/return", authorizeRoles("admin"), ctrl.returnBook);
router.get("/", ctrl.getIssues);

module.exports = router;
