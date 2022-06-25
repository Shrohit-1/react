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
            //browser
            const client=req.get('User-Agent');
            if(client.includes("Mozilla")==true){
                return res.redirect('/login');
            }
            //postman
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

//forgetPassword
module.exports.forgetpassword= async function forgetpassword(req,res){
    let {emailv}=req.body;
    try{
        const user= await  userModel.findOne({email:emailv});
        if(user){
            //creating this token and storing it in db so that we will be able to fetch user from DB from resetPassword link when provided password and resetPassword
            const resetToken= user.createResetToken();
            //creating link to be send to user through email for reseting password
            let resetPasswordLink=`${req.protocol}://${req.get('host')}/resetpassword/${resetToken}`;
            //sendEmail to the user
            //nodemailer will be user=d for this purpose
        }
        else{
            res.json({
                message:"Invalid email"
            })
        }
    }
    catch(err){
       res.status(500).json({
        message:err.message
       }) 
    }
}
//rsetpassword
module.exports.resetPassword= async function resetPassword(req,res){
    try{
        const token= req.params.token;
        let {password,confirmpassword}= req.body;
        //token fetched from link is searched in db as in forgetpassword we stored the token in the db
        const user= await userModel.findOne({resetToken:token});
        if(user){
            //this function will update user's password in db
            user.resetPasswordHandler(password,confirmpassword);
            await user.save();
            res.json({
                message:"user password changed successfully"
            })
        }
        else{
            res.json({
                message:"Invalid Token"
            })
        }
    }
    catch(err){
        res.json({
            message:err.message
        })
    }
    
}


//logout
module.exports.logout= async function logout(req,res){
    //replace data of login cookie with empty string and after 1 ms this cookie will be destroyed
    res.cookie('login',' ',{maxAge:1});
    res.json({
        message:"Logged Out Successfully"
    });
}