const express = require("express")
const authRouter = require("./router/auth.router");
const cookieParser = require("cookie-parser");
const accountRouter = require("./router/account.router");
const app = express();
app.use(express.json());
app.use(cookieParser())
app.use("/api/auth" ,authRouter );
app.use("/api/account" , accountRouter)
module.exports = app 