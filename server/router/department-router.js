const express = require("express");
const getAllDepartments = require("../controllers/department-controller");
const authMiddleware = require("../middlewares/auth-middleware");

const router = express.Router();

router.route('/departments').get(getAllDepartments);


module.exports = router;