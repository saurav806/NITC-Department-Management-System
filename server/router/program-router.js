const express = require("express");
const getAllPrograms = require("../controllers/program-controller");
const authMiddleware = require("../middlewares/auth-middleware");

const router = express.Router();

router.route('/programs').get(getAllPrograms);


module.exports = router;