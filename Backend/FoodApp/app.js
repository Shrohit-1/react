const express= require('express');
const path= require('path')
const app= express();
const cookieParser= require('cookie-parser')
//for reading object which is passed in post
app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(cookieParser())

const userRouter= require('./Routers/userRouter')
const authRouter= require('./Routers/authRouter');



app.use("/auth",authRouter);
app.use("/user",userRouter);

app.listen(8080);