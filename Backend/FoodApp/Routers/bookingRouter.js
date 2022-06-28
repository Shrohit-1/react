const express= require('express');
const { protectRoute } = require('../controller/authController');
const { createSession } = require('../controller/bookingController');
const bookingRouter= express.Router();
const path= require("path");

bookingRouter.route("/createSession")
.get(function(req,res){
    res.sendFile('./checkout.html',{root:path.join(__dirname)})
})

bookingRouter.route("/createSession")
.post(createSession);

module.exports=bookingRouter