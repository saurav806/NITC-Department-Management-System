const express = require("express");
const projectControllers = require("../controllers/project-controller");
const authMiddleware = require("../middlewares/auth-middleware");
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

router 
  .route('/update-applied-project')
  .put(authMiddleware, appliedProjectControllers.updateAppliedProject);

router 
  .route('/update-listed-project')
  .put(authMiddleware, appliedProjectControllers.updateListedProject);

// New route for rejecting other requests
router
  .route('/reject-other-requests/:projectID')
  .put(authMiddleware, appliedProjectControllers.rejectOtherRequests);

module.exports = router;