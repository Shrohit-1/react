const express= require('express');
const path= require('path')
const userRouter=express.Router();
const { getUser,updateUser,getAllUser,deleteUser} =require('../controller/userController');
const {protectRoute,signup,login,isAuthorised}=require("../controller/authController")

//Mounting

//user Options
userRouter.route('/:id')
.patch(updateUser)
.delete(deleteUser)

userRouter.route('/signup')
.post(signup);

userRouter.route('/login')
.post(login);

//profile page
userRouter.use(protectRoute);
userRouter.route('/userProfile')
.get(getUser);



//admin specific function
userRouter.use(isAuthorised(['admin']));
userRouter.route('/')
.get(getAllUser)


module.exports=userRouter;
