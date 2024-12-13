const mongoose  = require("mongoose");

const bookSchema = new mongoose.Schema({
  title:{
    type:String,
    required:true,
    unique:true
  },
  url:{
    type:String,
    required:true,
    unique:true
  },
  author:{
    type:String,
    required:true,
  },
  language:{
    type:String,
    default:"English",
  },
  price:{
    type:Number,
    required:true
  },
  desc:{
    type:String,
    required:true
  },
},
{timestamps:true}
);

const Book = mongoose.model("book", bookSchema);

module.exports = Book;
