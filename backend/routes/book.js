const express = require("express");
const router = express.Router();
const BookController = require("../controllers/book.js");
const { authenticateToken} = require("../middlewares/authMiddleware.js");

router.route("/add-books").post(authenticateToken, BookController.addBooks);

router.route("/update-book").put(authenticateToken, BookController.updateBook);

router.route("/deleteBook").delete(authenticateToken, BookController.deleteBook);

router.route("/get-all-books").get(BookController.getAllBooks);

router.route("/get-recent-books").get(BookController.getRecentBooks);

router.route("/view-book-details/:id").get(BookController.bookDetails);



module.exports = router;