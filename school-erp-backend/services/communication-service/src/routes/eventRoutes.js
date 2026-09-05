const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/eventController");
const { verifyToken, authorizeRoles } = require("../middleware/auth");

router.use(verifyToken);
router.post("/", authorizeRoles("admin", "teacher"), ctrl.createEvent);
router.get("/", ctrl.getEvents);
router.delete("/:id", authorizeRoles("admin", "teacher"), ctrl.deleteEvent);

module.exports = router;
