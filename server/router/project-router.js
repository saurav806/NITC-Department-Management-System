const express = require("express");
const projectControllers = require("../controllers/project-controller");
const authMiddleware = require("../middlewares/auth-middleware");
const projectMiddleware = require("../middlewares/project-middleware");
const appliedProjectControllers = require("../controllers/applied-project-controller");

const router = express.Router();

router
  .route("/list-project")
  .post(authMiddleware, projectControllers.projects);

router.route('/projects').get(authMiddleware, projectControllers.getAllProjects);

router
  .route('/applied-project')
  .post(authMiddleware, appliedProjectControllers.appliedProjects);

router 
  .route('/view-applied-project')
  .get(authMiddleware, appliedProjectControllers.getAllAppliedProjects);


module.exports = router;