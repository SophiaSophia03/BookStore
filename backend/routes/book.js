const express = require("express");
const router = express.Router();
const BookController = require("../controllers/book.js");
const { authenticateToken} = require("../middlewares/authMiddleware.js");

router.route("/addBooks").post(authenticateToken, BookController.addBooks);

module.exports = router;