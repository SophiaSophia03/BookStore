const User = require("../models/user.js");
const Book = require("../models/book.js");
const asyncHandler = require("express-async-handler");

// add-books *admin
module.exports.addBooks = asyncHandler(async(req,res) => {
  try {
    const { id } = req.headers;
    const user = await User.findById(id);
    if(user.role !== "admin"){
      return res.status(400).json({message:"YOu are not allowed to perform this task"})
    }

  const book = new Book({
    url:req.body.url,
    title:req.body.title,
    author:req.body.author,
    price:req.body.price,
    desc:req.body.desc,
    language:req.body.language,
  })
  await book.save();
  return res.status(200).json({message:"Book added successfuly!"})
  } catch(err){
    console.log(err)
    // res.status(500).json({message:"Internal Server Error"});
  }
})





//Get-Books
// module.exports.getBooks = asyncHandler(async(req,res) => {
//   try {
//     const { bookId } = req.headers;
//     const data = await Book.findById(id);
//     return res.status(200).json(data);
//   } catch(err){
//     res.status(500).json({message:"Internal Server Error"});
//   }
// })











