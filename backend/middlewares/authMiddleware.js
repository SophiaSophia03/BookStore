const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const authenticateToken = asyncHandler(async(req,res,next) => {

  const authHeader = req.headers["authorization"];
  const token  = authHeader && authHeader.split(" ")[1];

  if(token == null) {
    return res.send(401).json({message:"Authentication token required"});
  }
  jwt.verify(token, process.env.JWT_SECRET, (err,user)=> {
    if(err){
      return res.status(403).json({message:"Token is expired, Please login again."})
    }
    req.user = user;
    next();
  });











  // let token;
  // const authHeader = req.headers.authorization;
  // if(authHeader && authHeader.startsWith('Bearer')){
  //   try {

  //    //Get token from header
  //     token = authHeader.split(' ')[1];

  //     jwt.verify(token,process.env.JWT_SECRET, (err,user) => {
  //       if(err){
  //         return res.send(403).json({message:"Token is expired, Please login again!"});
  //       }
  //       req.user = user;
  //       next();
  //     })

  //   // //Verify the token
  //   //   const decoded = jwt.verify(token,process.env.JWT_SECRET);

  //   // //Get user from the token
  //   //   req.user = await User.findById(decoded.id).select('-password');
  //  // next();

  //   } catch (error) {
  //     console.log(err);
  //     res.status(401).json({message:"Not authorized"});
  //   }
  // }
  // if(!token){
  //   res.status(401).json({message:"Not Authourized, No Token available"})
  // }
});

module.exports ={ authenticateToken }