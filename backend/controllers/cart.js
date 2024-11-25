const User = require("../models/user.js");
const Book = require("../models/book.js");
const asyncHandler = require("express-async-handler");

//Add book to Cart
module.exports.addtoCart = asyncHandler(async(req,res) => {
  try {
    const { bookid, id } = req.headers;
    const user = await User.findById(id);
    const alreadyInCart = user.cart.includes(bookid);
    if(alreadyInCart){
      return res
      .status(200)
      .json({ message: "Book is already added into Cart!" });
    }else{
      await User.findByIdAndUpdate(id,{$push:{cart:bookid}});
      res.status(200)
      .json({ message: "Book is added into Cart!" });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
})

//remove book from favourites
module.exports.delFromCart = asyncHandler(async(req,res) => {
  try {
    const { bookid, id } = req.headers;
  const user = await User.findById(id);
  const alreadyInCart = user.cart.includes(bookid);
  if(alreadyInCart){
    await User.findByIdAndUpdate(id,{$pull:{cart:bookid}});
    res.status(200)
    .json({ message: "Book is removed from Cart!" });
  }
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
})

//Get all books from favourites
module.exports.getCartBooks = asyncHandler(async(req,res) => {
  try {
    const { id } = req.headers;
    const user = await User.findById(id).populate("cart");
    const cartBooks = user.cart;
    res.status(200)
    .json({ message: `Total ${cartBooks.length} books in Cart.`, data: cartBooks });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
})