const router = require("express").Router();

const {
  signup,
  signin,
  isAuth
} = require("../controllers/user.controller.js");

// Routes
router.post("/user/signup", signup);
router.post("/user/signin", signin);
router.get("/user/isAuth", isAuth);

module.exports = router;