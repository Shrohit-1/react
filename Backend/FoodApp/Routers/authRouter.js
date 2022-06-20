const express= require('express');
const userModel= require('../models/userModel')
const authRouter=express.Router();
const JWT= require('jsonwebtoken');
const {JWT_KEY}=require("../Secret/secret");
//signup
authRouter
.route("/signup")
.get(middleware,getSignUp) //used middleware functions here, starts from 1st then 2nd and so on call next from current func using next()
.post(postSignUp)

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


//login
authRouter
.route('/login')
.post(loginUser)

async function loginUser(req,res){
    try{
        let data= req.body;
        if(data.email){
            let user=await userModel.findOne({email:data.email});
            if(user){
                if(user.password==data.password){

                    //creating signature using uid and default algo HMAC SHA256
                    let uid= user['_id'];
                    let jwt= JWT.sign({payload:uid},JWT_KEY);

                    res.cookie('login',jwt,{httpOnly:true});

                    return res.json({
                        message:"User Logged in",
                        userDetails:user
                    })
                }
                else{
                    return res.json({
                        message:"Wrong credentials"
                    })
                }
            }
            else{
                return res.json({
                    message:"Wrong credentials"
                })
            }
        }
        else{
            res.json({
                message:"Empty field"
            })
        }
    }
    catch(err){
        return res.status(500).json({
            message:err.message
        })
    }
}


module.exports= authRouter;