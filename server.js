require("dotenv").config();
const express = require('express');  
const app = express();
const port=process.env.port || 8000
const session=require("express-session")
require("./config/db")

app.use(express.json())

app.use(express.urlencoded({ extended: true }));

const morgan=require("morgan")
app.use(morgan("combined"))
const helmet=require("helmet")
app.use(helmet())

app.use(session({
    secret:'secret',
    resave: false,
    saveUninitialized: false
}));

app.post("/login",(req,res)=>{
    if(req.body.username=="Admin" && req.body.password=="pass")
    {
        req.session.username=req.body.username;
        req.session.loggedin=true;
        res.status(200).send("auth success")
    }
    else
    {
        res.status(401).send("not authorized")
    }
})

function validate_session(req,res,next)
{
    if(req.session.loggedin==true)
    {
        next()
    }
    else
    {
        return res.status(401).send("not authorized")
    }
}

const BookRouter=require("./routes/Bookroute")
app.use("/books",validate_session,BookRouter)

app.listen(port,()=>{
    console.log(`running on ${port}`)
});