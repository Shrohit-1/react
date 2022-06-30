const express= require('express');
const userRouter=express.Router();
const { getUser,updateUser,getAllUser,deleteUser,updateProfileImage} =require('../controller/userController');
const {protectRoute,signup,login,isAuthorised,logout,forgetpassword,resetPassword}=require("../controller/authController")
const multer=require("multer");
const path=require("path");
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

//multer for fileupload

//upload-> Storage, filter
//defines where multer will be stored and what is the filename
const multerStorage=multer.diskStorage({
    destination:function(req,res,cb){
        cb(null,"public/Images")
    },
    filename:function(req,res,cb){
        cb(null,`user-${Date.now()}.jpeg`);
    }
})

//filter
const filter= function(req,file,cb){
    //if file type is image then accept it else reject it
    if(file.mimetype.startsWith("image")){
        cb(null,true);
    }
    else{
        cb(new Error("Not an Iamge! Please upload an image"));
    }
}
const upload= multer({
    storage:multerStorage, //how to store
    fileFilter:filter  // filtering of file
});

//profileIamge
userRouter.post("/profileImage",upload.single("photo"),updateProfileImage);

userRouter.get('/profileImage',(req,res)=>{
    res.sendFile("./multer.html",{root:path.join(__dirname)})
});

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
