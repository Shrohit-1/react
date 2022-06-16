const express= require('express');
const path= require('path')
const app= express();
const mongoose=require('mongoose');
//for reaading object passed in post
app.use(express.urlencoded({extended: true}));
app.use(express.json())
//username->admin
//password->2cUsHb2eT4X7699I
//Mounting

const userRouter=express.Router();
const authRouter=express.Router();
app.use("/auth",authRouter);
app.use("/user",userRouter);

userRouter
.route("/")
.get(getUsers)
.post(postUser)
.patch(updateUser)
.delete(deleteUSer)

userRouter
.route("/:id")
.get(getUserById)

authRouter
.route("/signup")
.get(middleware,getSignUp) //used middleware functions here, starts from 1st then 2nd and so on call next from current func using next()
.post(postSignUp)

//read in mongo DB
async function getUsers(req,res){
    console.log("user delivered Successfully");
    //-> all documents -> let allUsers=await userModel.find();
    let user= await userModel.findOne({name:"mario"});
    res.json({
        message:"lists of all users",
        data:user
    });
}

function postUser(req,res){
    users.push(req.body);
    res.json({
        message:"Data added successfully",
        data:req.body
    })
}
//update in nomgo db
async function updateUser(req,res){
    let dataToBeUpdated= req.body;
    let user= await userModel.findOneAndUpdate({email:"shnhifauihuf@hufha.com"},dataToBeUpdated);
    res.json({
        message:"Data updated",
    })
}
//delete in mongo db
async function deleteUSer(req,res){
    let data= req.body;
    let user= await userModel.findOneAndDelete(data);
    res.json({
        message:"User deleted",
        user:user
    })
}


function getUserById(req,res){
    let id=req.params.id;
    console.log(req.params.id);
    for(let i=0;i<users.length;i++){
        if(users[i].id===id){
            res.json({user:users[i]});
            return;
        }
    }
    res.json({
        message:"user not found"
    })
}

function middleware(req,res,next){
    console.log("middleware called");
    next();
}

function getSignUp(req,res){
    console.log("getSignedup Called from middleware");
    res.sendFile("./public/index.html",{root:path.join(__dirname)})
}
//create in mongodb
async function postSignUp(req,res){
    let dataObj=req.body;
    let data = await userModel.create(dataObj);
    
    res.json({
        message:"USer signed up ",
        user:data
    })
}

const db_link='mongodb+srv://admin:2cUsHb2eT4X7699I@cluster0.mdwcxbg.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(db_link)
.then(function(db){
    console.log("DB CONNECTED");
})
.catch(function(err){
    console.log(err);
})

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minLength:8
    },
    confirmPassword:{
        type:String,
        required:true,
        minLength:8
    }
});

//model
const userModel = mongoose.model('userModel',userSchema);

//Each object is a document  and the set of documents is called collection

async function createUser(){
    let user={
        name:"mario",
        email:"mario@gmail.com",
        password:'123456789',
        confirmPassword:'123456789'
    };
    let data= await userModel.create(user);
    console.log(data);
}


app.listen(8080);