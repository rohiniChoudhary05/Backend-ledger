const express = require("express")
const { userRegisterController, loginUserController } = require("../controllers/auth.controllers")


const router = express()
/*  POST METHOD   /api/auth/register */
router.post("/register" , userRegisterController) 
/* POST Method /api/auth/login */
router.post("/login" , loginUserController)
 
module.exports = router