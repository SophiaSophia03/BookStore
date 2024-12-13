const User = require("../models/user.js");
const Book = require("../models/book.js");
const asyncHandler = require("express-async-handler");

// add-books *admin
module.exports.addBooks = asyncHandler(async (req, res) => {
  try {
    const { id } = req.headers;
    const user = await User.findById(id);
    if (user.role !== "admin") {
      return res
        .status(400)
        .json({ message: "YOu are not allowed to perform this task" });
    }

    const book = new Book({
      title: req.body.title,
      url: req.body.url,
      author: req.body.author,
      language: req.body.language,
      price: req.body.price,
      desc: req.body.desc,
    });
    await book.save();
    return res.status(200).json({ message: "Book added successfuly!" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//update-books *admin
module.exports.updateBook = asyncHandler(async (req, res) => {
  try {
    const { bookid, id } = req.headers;
    const user = await User.findById(id);
    if (user.role !== "admin") {
      return res
        .status(400)
        .json({ message: "YOu are not allowed to perform this task" });
    }
    await Book.findByIdAndUpdate(bookid, {
      url: req.body.url,
      title: req.body.title,
      author: req.body.author,
      price: req.body.price,
      desc: req.body.desc,
      language: req.body.language,
    });
    return res.status(200).json({ message: "Book updated successfuly!" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//delete-books *admin
module.exports.deleteBook = asyncHandler(async (req, res) => {
  try {
    const { bookid, id } = req.headers;
    const user = await User.findById(id);
    if (user.role !== "admin") {
      return res
        .status(400)
        .json({ message: "YOu are not allowed to perform this task" });
    }
    await Book.findByIdAndDelete(bookid);
    return res.status(200).json({ message: "Book deleted successfuly!" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//get-all-books
module.exports.getAllBooks = asyncHandler(async (req, res) => {
  try {
    const allBooks = await Book.find().sort({ createdAt: -1 });
    return res
      .status(200)
      .json({ status: "Success", data: allBooks });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//get-recent-books
module.exports.getRecentBooks = asyncHandler(async (req, res) => {
  try {
    const recBooks = await Book.find().sort({ createdAt: -1 }).limit(4);
    return res
      .status(200)
      .json({ status: "Success", data: recBooks });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//get-book-details
module.exports.bookDetails = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const bookDetails = await Book.findById(id);
    return res
      .status(200)
      .json({ status: "Success", data: bookDetails });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});