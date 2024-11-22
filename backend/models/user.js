const mongoose  = require("mongoose");

const userSchema = new mongoose.Schema({
  username:{
    type:String,
    required:true,
    unique:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true,
  },
  address:{
    type:String,
    required:true
  },
  role:{
    type:String,
    default:"user",
    enum:["user", "admin"]
  },
  favourites:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"books",
  }],
  cart:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"books",
  }],
  orders:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"order",
  }],
},
{timestamps:true}
);

const User = mongoose.model("User", userSchema);

module.exports = User;
