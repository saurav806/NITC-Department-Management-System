const express = require("express");
const getAllDepartments = require("../controllers/department-controller");
const authMiddleware = require("../middlewares/auth-middleware");
// const projectMiddleware = require("../middlewares/project-middleware");

const router = express.Router();

// router
//   .route("/department")
//   .post(authMiddleware, projectControllers.projects);

router.route('/departments').get(getAllDepartments);


module.exports = router;