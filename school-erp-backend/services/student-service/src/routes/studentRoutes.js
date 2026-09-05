const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/studentController");
const { verifyToken, authorizeRoles, restrictToOwnStudent } = require("../middleware/auth");

router.use(verifyToken);

router.post("/", authorizeRoles("admin"), ctrl.createStudent);
router.get("/stats/summary", authorizeRoles("admin", "teacher"), ctrl.bulkStats);
router.get("/", authorizeRoles("admin", "teacher", "student", "parent"), ctrl.getStudents);
router.get("/:id", restrictToOwnStudent((req) => req.params.id), ctrl.getStudentById);
router.put("/:id", authorizeRoles("admin"), ctrl.updateStudent);
router.delete("/:id", authorizeRoles("admin"), ctrl.deleteStudent);

module.exports = router;
