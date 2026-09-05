const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/inventoryController");
const { verifyToken, authorizeRoles } = require("../middleware/auth");

router.use(verifyToken, authorizeRoles("admin"));
router.post("/", ctrl.addItem);
router.get("/", ctrl.getItems);
router.put("/:id", ctrl.updateItem);
router.delete("/:id", ctrl.deleteItem);

module.exports = router;
