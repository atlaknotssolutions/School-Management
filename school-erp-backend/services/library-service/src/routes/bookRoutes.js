const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/bookController");
const { verifyToken, authorizeRoles } = require("../middleware/auth");

router.use(verifyToken);
router.post("/", authorizeRoles("admin"), ctrl.addBook);
router.get("/", ctrl.getBooks);
router.put("/:id", authorizeRoles("admin"), ctrl.updateBook);
router.delete("/:id", authorizeRoles("admin"), ctrl.deleteBook);

module.exports = router;
