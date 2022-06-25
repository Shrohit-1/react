const express= require('express');
const userRouter=express.Router();
const { getUser,updateUser,getAllUser,deleteUser} =require('../controller/userController');
const {protectRoute,signup,login,isAuthorised,logout,forgetpassword,resetPassword}=require("../controller/authController")

//Mounting

//user Options
userRouter.route('/:id')
.patch(updateUser)
.delete(deleteUser)

//signup
userRouter.route('/signup')
.post(signup);

//login
userRouter.route('/login')
.post(login);

//forget-password
userRouter.route('/forgetpassword')
.post(forgetpassword);

//reset-password
userRouter.route('/resetpassword')
.post(resetPassword);

//profile page
userRouter.use(protectRoute);
userRouter.route('/userProfile')
.get(getUser);

//logout
userRouter.route('/logout')
.get(logout);


//admin specific function
userRouter.use(isAuthorised(['admin']));
userRouter.route('/')
.get(getAllUser)


module.exports=userRouter;
