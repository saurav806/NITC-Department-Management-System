const express = require("express");
const authMiddleware = require("../middlewares/auth-middleware");
const adminMiddleware = require("../middlewares/admin-middleware");
const hallController = require("../controllers/hall-controller");
const router = express.Router();

const getAllUser = require("../controllers/admin-controller");

// User routes
router.route("/users").get(authMiddleware, adminMiddleware, getAllUser);

// Hall routes
router.route("/halls").post(authMiddleware, adminMiddleware, hallController.halls);
router.route("/hall-list/:hallId?").get(authMiddleware, hallController.getAllHalls);

module.exports = router;
