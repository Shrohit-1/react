const express= require('express');
const JWT= require('jsonwebtoken');
const {JWT_KEY} =require("../Secret/secret");
//user is logged in or not
function protectRoute(req,res,next){
   // console.log(req.cookies);
    if(req.cookies.login){
        let isVerified= JWT.verify(req.cookies.login,JWT_KEY);
        if(isVerified){
            next();
        }
        else{
            return res.json({
                message:"User Not Authorized"
            })
        }
    }
    else{
        return  res.json({
            message:"unauthorized access"
        })
    }
}

module.exports=protectRoute;