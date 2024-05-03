const express = require("express");
const requestControllers = require("../controllers/request-controller");
const authMiddleware = require("../middlewares/auth-middleware");

const router = express.Router();

// router
//   .route("/list-project")
//   .post( projectControllers.projects);

router.route('/projects').get(authMiddleware, projectControllers.getAllProjects);


module.exports = router;