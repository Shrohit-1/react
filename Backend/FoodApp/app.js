const express= require('express');
const app= express();
const cookieParser= require('cookie-parser')

//for reading object which is passed in post
app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(cookieParser())

const userRouter= require('./Routers/userRouter')
const planRouter=require('./Routers/planRouter');

app.use("/user",userRouter);
app.use("/plans",planRouter);

app.listen(8080);