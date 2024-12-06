const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.js");
const User = require("../models/user.js");
const {authenticateToken} = require("../middlewares/authMiddleware.js");

router.route("/signup").post(UserController.signupUser);

router.route("/login").post(UserController.loginUser);

router.route("/get-user-Info").get(authenticateToken, UserController.getUserInfo);

router.route("/updateAddress").put(authenticateToken, UserController.updateAddress);

module.exports = router;
