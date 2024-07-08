const express = require("express");
const authMiddleware = require("../middlewares/auth-middleware");

const getAllUser = require("../controllers/admin-controller");
const adminMiddleware = require("../middlewares/admin-middleware");
const halls = require("../controllers/hall-controller");
const router = express.Router();

router.route("/users").get(authMiddleware,adminMiddleware, getAllUser);


//Hall routes here
router.route("/halls").post(authMiddleware,adminMiddleware,halls);


module.exports = router;