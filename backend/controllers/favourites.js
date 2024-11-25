const User = require("../models/user.js");
const Book = require("../models/book.js");
const asyncHandler = require("express-async-handler");

//Add book to favourites
module.exports.addToFav = asyncHandler(async(req,res) => {
  try {
    const { bookid, id } = req.headers;
  const user = await User.findById(id);
  const alreadyFav = user.favourites.includes(bookid);
  if(alreadyFav){
    return res
    .status(200)
    .json({ message: "Book is already in favourites!" });
  }else{
    await User.findByIdAndUpdate(id,{$push:{favourites:bookid}});
    res.status(200)
    .json({ message: "Book is added into favourites!" });
  }
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
})

//remove book from favourites
module.exports.delFromFav = asyncHandler(async(req,res) => {
  try {
    const { bookid, id } = req.headers;
  const user = await User.findById(id);
  const alreadyFav = user.favourites.includes(bookid);
  if(alreadyFav){
    await User.findByIdAndUpdate(id,{$pull:{favourites:bookid}});
    res.status(200)
    .json({ message: "Book is removed from favourites!" });
  }
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
})

//Get all books from favourites
module.exports.getFavBooks = asyncHandler(async(req,res) => {
  try {
    const { id } = req.headers;
    const user = await User.findById(id).populate("favourites");
    const favBooks = user.favourites;
    res.status(200)
    .json({ message: `Total ${favBooks.length} books in favourites.`, data: favBooks });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
})