const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.js");
const User = require("../models/user.js");

router
.route("/signup")
.post(UserController.signupUser);

router
.route("/login")
.post(UserController.loginUser)

module.exports = router;