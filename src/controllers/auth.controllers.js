const userModel = require("../model/user.model")
const jwt = require("jsonwebtoken")
const emailService = require("../services/email.service")

/* 
* -User Register controller
* - POST /api/auth/register
*/
async function userRegisterController(req, res) {
    const {email , password , name } = req.body
    const isExists = await userModel.findOne({
        email:email
    })
    if(isExists){
        return res.status(422).json({
            message:"User Already exists with email.",
            status:"failed"
        })
    }
    const user = await userModel.create({
        email, password ,name
    })

    const token = jwt.sign({userId:user._id} , process.env.JWT_SECRET, {
        expiresIn:"3d"
    })
    res.cookie("token" , token)

    res.status(201).json({
        message:"User Register SuccessFully",
        user:{
            _id:user._id,
            email:user.email,
            name:user.name
        },
        token
    })
    
    await emailService.sendRegistrationEmail(user.email , user.name)
  
  
}


/* 
* -User Login controller
* - POST /api/auth/login
*/


async function loginUserController(req, res) {

    const {email, password} = req.body
    // console.log(email , password);
    

    const user = await  userModel.findOne({email}).select("+password")
    // console.log("This user details",user);
    

    if(!user){
      return  res.status(401).json({
            message:"Email  or password " 
        })
    }

    const isValidPassword = await user.comparePassword(password)
    // console.log("This is validPassword", isValidPassword);
    

    if(!isValidPassword){
        return res.status(401).json({
            message:"Email or Password INVALID"
        })
    }

     const token = jwt.sign({userId:user._id} , process.env.JWT_SECRET, {
        expiresIn:"3d"
    })
    res.cookie("token" , token)

    res.status(200).json({
        message:"User Login SuccessFully",
        user:{
            _id:user._id,
            email:user.email,
            name:user.name
        },
        token
    })

}



module.exports = {userRegisterController , loginUserController}
