const mongoose  = require("mongoose");

const bookSchema = new mongoose.Schema({
  url:{
    type:String,
    required:true,
    unique:true
  },
  title:{
    type:String,
    required:true,
    unique:true
  },
  author:{
    type:String,
    required:true,
  },
  price:{
    type:Number,
    required:true
  },
  desc:{
    type:String,
    required:true
  },
  language:{
    type:String,
    default:"English",
  }
},
{timestamps:true}
);

const Book = mongoose.model("book", bookSchema);

module.exports = Book;
