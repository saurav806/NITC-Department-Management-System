const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth-controller");
// const authMiddleware = require("../middlewares/auth-middleware");
const {loginSchema,signupSchema, facultySignupSchema} = require("../validators/auth-validators");
const validate = require("../middlewares/validate-middleware");


router
  .route("/faculty-register")
  .post( validate(facultySignupSchema), authControllers.facultyRegister);

// router
//     .route("/faculty-login")
//     .post( authControllers.login);

// router.route("/user").get(authMiddleware, authControllers.user);

// router
//   .route("/list-project")
//   .post( authControllers.projects);

module.exports = router;