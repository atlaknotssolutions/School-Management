const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/hostelController");
const { verifyToken, authorizeRoles } = require("../middleware/auth");

router.use(verifyToken);
router.post("/", authorizeRoles("admin"), ctrl.createRoom);
router.get(
  "/",
  authorizeRoles("admin", "teacher", "student", "parent"),
  ctrl.getRooms,
);
router.patch("/:id/allot", authorizeRoles("admin"), ctrl.allotRoom);
router.patch("/:id/vacate", authorizeRoles("admin"), ctrl.vacateRoom);
router.delete("/:id", authorizeRoles("admin"), ctrl.deleteRoom);

module.exports = router;
