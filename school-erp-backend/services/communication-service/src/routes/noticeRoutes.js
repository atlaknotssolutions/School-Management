const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/noticeController");
const { verifyToken, authorizeRoles } = require("../middleware/auth");

router.use(verifyToken);
router.post("/", authorizeRoles("admin", "teacher"), ctrl.createNotice);
router.get("/", ctrl.getNotices);
router.delete("/:id", authorizeRoles("admin", "teacher"), ctrl.deleteNotice);

module.exports = router;
