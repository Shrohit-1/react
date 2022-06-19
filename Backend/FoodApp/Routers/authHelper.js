const express= require('express');

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

module.exports=protectRoute;