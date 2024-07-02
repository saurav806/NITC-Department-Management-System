const express = require("express");
const projectControllers = require("../controllers/project-controller");
const authMiddleware = require("../middlewares/auth-middleware");
const projectMiddleware = require("../middlewares/project-middleware");

const router = express.Router();

router
  .route("/list-project")
  .post(authMiddleware, projectControllers.projects);

router.route('/projects').get(authMiddleware, projectControllers.getAllProjects);


module.exports = router;