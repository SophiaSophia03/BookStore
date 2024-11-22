const User = require("../models/user.js");
const bcrypt = require("bcryptjs");
const jwt  = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

module.exports.signupUser = asyncHandler(async(req,res)=> {
  try{
    let {username,email,password,address} = req.body;

    //checking if username already exists
    const existingUsername = await User.findOne({username:username});
    if(existingUsername){
      return res.status(400)
      .json({message:"Username already exists!"})
    }

    //checking if email already exists
    const existingEmail = await User.findOne({email:email});
    if(existingEmail){
      return res.status(400)
      .json({message:"Email already exists!"})
    }

    //checking if password length is leass greater than 6
    if(password.length < 6){
      return res.status(400)
      .json({message:"Password must be at least 6 chars long!"})
    }

    //checking if username length is leass greater than 4
    if(username.length < 4){
      return res.status(400)
      .json({message:"Username must be at least 4 chars long!"})
    }

    // All fields are required
    if (!username || !email || !password || !address) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      username: username,
      email:email,
      password:hashedPassword,
      address:address
    });
    await newUser.save();
    return res.status(201)
      .json({
        message:"Sign up Successfuly",
        _id:newUser.id,
        email:newUser.email
      })
  }catch(err){
    res.status(500).json({message:"Internal Server Error"});
  }
})

module.exports.loginUser = asyncHandler(async(req,res)=> {
  try{
    let {username,password} = req.body;

    const existingUser = await User.findOne({username});
    if(!existingUser){
      return res.status(400).json({message:"Invalid Username or Password"});
    }
    await bcrypt.compare(password,existingUser.password, (err,data)=>{
      if(data){
        return res.status(201).json({message:"Login Sucessfuly"});
      }
      else{
        return res.status(400).json({message:"Invalid Username or Password"});
      }
    })

  }catch(err){
    res.status(500).json({message:"Internal Server Error"});
  }
})