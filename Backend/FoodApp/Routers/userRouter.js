const express= require('express');
const path= require('path')
const userRouter=express.Router();
const userModel= require("../models/userModel")

//Mounting
userRouter
.route("/")
.get( protectRoute,getUsers)
.post(postUser)
.patch(updateUser)
.delete(deleteUSer)

userRouter
.route("/:id")
.get(getUserById)


//read in mongo DB
async function getUsers(req,res){
    console.log("user delivered Successfully");
    //-> all documents ->
    let allUsers=await userModel.find();
    //let user= await userModel.findOne({name:"mario"});
    res.json({
        message:"lists of all users",
        data:allUsers
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

//user is logged in or not
function protectRoute(req,res,next){
    console.log(req.cookies);
    if(req.cookies.isLoggedIn=='true'){
        next();
    }
    else{
        return  res.json({
            message:"unauthorized access"
        })
    }
}

module.exports=userRouter;
