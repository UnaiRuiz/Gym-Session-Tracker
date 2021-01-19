const router = require("express").Router();

const {
  renderSignUpForm,
  singup,
  renderSigninForm,
  signin,
  logout
} = require("../controllers/user.controller.js");

// Routes
router.get("/user/signup", renderSignUpForm);
router.post("/user/signup", singup);
router.get("/user/signin", renderSigninForm);
router.post("/user/signin", signin);
router.get("/user/logout", logout);

module.exports = router;