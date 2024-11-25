const express = require("express");
const router = express.Router();
const BookController = require("../controllers/book.js");
const { authenticateToken} = require("../middlewares/authMiddleware.js");

router.route("/addBooks").post(authenticateToken, BookController.addBooks);

router.route("/updateBook").put(authenticateToken, BookController.updateBook);

router.route("/deleteBook").delete(authenticateToken, BookController.deleteBook);

router.route("/getBooks").get(BookController.getAllBooks);

router.route("/recBooks").get(BookController.getRecentBooks);

router.route("/bookDetails/:id").get(BookController.bookDetails);



module.exports = router;