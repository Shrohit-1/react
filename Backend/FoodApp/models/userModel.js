const mongoose=require('mongoose');
const emailValidator=require("email-validator");
const bcrypt = require('bcrypt');

const db_link='mongodb+srv://admin:2cUsHb2eT4X7699I@cluster0.mdwcxbg.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(db_link)
.then(function(db){
    console.log("DB CONNECTED");
})
.catch(function(err){
    console.log(err);
})

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate: function(){
            return emailValidator.validate(this.email);
        }
    },
    password:{
        type:String,
        required:true,
        minLength:8
    },
    confirmPassword:{
        type:String,
        required:true,
        minLength:8,
        validate : function(){
            return this.confirmPassword==this.password;
        }
    }
});

//mongoose hooks
//We dont need to save confirmpassword field in db
userSchema.pre('save',function(){
    this.confirmPassword=undefined;
})
//Hashing the password using Bcrypt library
// userSchema.pre('save',async function(){
//     let salt= await bcrypt.genSalt();
//     let hashedPass= await bcrypt.hash(this.password,salt);
//     this.password=hashedPass;
// })
//model
const userModel = mongoose.model('userModel',userSchema);

//Each object is a document  and the set of documents is called collection

module.exports=userModel;