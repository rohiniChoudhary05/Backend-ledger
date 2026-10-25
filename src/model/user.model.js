const mongoose = require("mongoose")
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true , "Email is required for creating an account "],
        trim:true,
        lowercase:true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email"],
        unique:[true , "email already exists"]
    },
    name:{
      type:String,
      required:[true , "Name is required for creating an account"]
    }, 
    password:{
        type:String,
        required:[true , "Password is required for creating an account"],
        minlength:[6, "password should contain more than 6 character"],
        select:false
    }
},{
    timestamps:true
})


userSchema.pre("save" , async function(next){
  if(!this.isModified("password")){
    // return next()
    return
  }
  
  const hash = await bcrypt.hash(this.password , 10)
  this.password = hash
//   return next() 
return
})

userSchema.methods.comparePassword = async function(password) {
//   console.log(password);
//   console.log(this.password);
  
  
    return await bcrypt.compare(  password  , this.password )
    
}

const userModel = mongoose.model("user" , userSchema)

module.exports = userModel