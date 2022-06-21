const express= require('express');
const userModel= require('../models/userModel')
const authRouter=express.Router();
const JWT= require('jsonwebtoken');
const {JWT_KEY}=require("../Secret/secret");

//user signup
module.exports.signup = async function signup(req,res){
    try{
        let dataObj=req.body;
        let data = await userModel.create(dataObj);
        if(data){
            res.json({
                message:"User signed up ",
                user:data
            })
        }
        else{
            res.json({
                message:"error in signing up try again"
            })
        }
    }
    catch(err){
        res.json({
            message:err.message
        })
    }
}

//user login
module.exports.login =  async function login(req,res){
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

//isAuthorized for accessing all users checking if request is made by admin or not
module.exports.isAuthorised = function isAuthorised(roles){
    return function(req,res,next){
        if(roles.includes(req.role)==true){
            next();
        }
        else{
            res.status(401).json({
                message:"unAuthorized Access"
            })
        }
    }
}

//checking if user is logged in or not
module.exports.protectRoute= async function protectRoute(req,res,next){
    try{
        // console.log(req.cookies);
        if(req.cookies.login){
            // verify function return payload and we used id as our payload
            let payload= JWT.verify(req.cookies.login,JWT_KEY);
            if(payload){
                const user= await userModel.findById(payload.payload);
                req.id=user.id;
                req.role= user.role;
                next();
            }
            else{
                return res.json({
                    message:"User Not Verified"
                })
            }
        }
        else{
            return  res.json({
                message:"Please login"
            })
        }
    }
    catch(err){
        res.json({
            message:err.message
        })
    }
}