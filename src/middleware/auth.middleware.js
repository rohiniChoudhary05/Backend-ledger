const userModel = require("../model/user.model");
const jwt = require("jsonwebtoken")


// async function authMiddleware (req, res , next){
    

//     try {
//         const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
//         console.log("This is Auth Middleware Token PRint ",token);
    
//        if(!token){
//         return res.status(401).json({
//             message:"Unauthorized access , token is missing"
//         })
//         }

//         console.log()
//         const decode = jwt.verify(token , process.JWT_SECRET)
//         console.log("This is Decode",decode);
        
//         const user = userModel.findById(decode.userId)
//         console.log("User data  in auth Middleware" , user);
        
//         req.user = user
//         next()
//     } catch (error) {
//         return res.status(401).json({
//             message:"Unauthorized access , token is invalid"
//         })
//     }
// }


const authMiddleware = async (req, res, next) => {
  try {
    const token =
      req.cookies.token ||
      req.headers.authorization?.split(" ")[1];
    // console.log("This is Auth middleware token ", token);
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token Not Found!"
      });
    }

    const decode = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const user = await userModel.findById(decode.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found"
      });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized Access",
      error: error.message
    });
  }
};

module.exports = authMiddleware;
// module.exports = {authMiddleware}