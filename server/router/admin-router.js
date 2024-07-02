const express = require("express");
const authMiddleware = require("../middlewares/auth-middleware");

const getAllUser = require("../controllers/admin-controller");
const adminMiddleware = require("../middlewares/admin-middleware");
const router = express.Router();

router.route("/users").get(authMiddleware,adminMiddleware, getAllUser);


module.exports = router;