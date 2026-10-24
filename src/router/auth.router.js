const express = require("express")
const { userRegisterController } = require("../controllers/auth.controllers")


const router = express()
/*  POST METHOD   /api/auth/register */
router.post("/register" , userRegisterController) 
/* get Method /api/auth/login */
module.exports = router