const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth-controller");
const authMiddleware = require("../middlewares/auth-middleware");
const { loginSchema, signupSchema } = require("../validators/auth-validators");
const validate = require("../middlewares/validate-middleware");

// router.route("/").get((req, res) => {
//     res
//     .status(200)
//     .send('welcome to my project under auth');
// });

router.route("/").get(authControllers.home);

router
  .route("/register")
  .post(validate(signupSchema), authControllers.register);

router.route("/login").post(validate(loginSchema), authControllers.login);

router.route("/user").get(authMiddleware, authControllers.user);

router.route("/update-user").put(authMiddleware, authControllers.updateUser);

// router
//   .route("/list-project")
//   .post( authControllers.projects);

module.exports = router;
