require("dotenv").config()
const app = require("./src/app");
const  connectDB  = require("./src/config/db");


connectDB()
let port = process.env.PORT || 4000
app.listen(3000 , ()=>{
    console.log(`Server is Running on Port ${port}`);
    
})