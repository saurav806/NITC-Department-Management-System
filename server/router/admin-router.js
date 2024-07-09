const express = require("express");
const authMiddleware = require("../middlewares/auth-middleware");

const getAllUser = require("../controllers/admin-controller");
const adminMiddleware = require("../middlewares/admin-middleware");
const hallController = require("../controllers/hall-controller");
const router = express.Router();

router.route("/users").get(authMiddleware,adminMiddleware, getAllUser);


//Hall routes here
router.route("/halls").post(authMiddleware,adminMiddleware, hallController.halls);
router.route("/hall-list").get(authMiddleware, hallController.getAllHalls);

router.route("/booked-hall-list").get(hallController.getallBook);




module.exports = router;