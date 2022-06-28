const mongoose=require('mongoose');
const {db_link}= require("../Secret/secret");

mongoose.connect(db_link)
.then(function(db){
    console.log("DB CONNECTED");
})
.catch(function(err){
    console.log(err);
})

const reviewSchema= new mongoose.Schema({
    review:{
        type:String,
        required:[true,'review is required'],
        maxLength:[50,'plan name should not exceed more than 50 charcter']
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    rating:{
        type:Number,
        required:[true,"Rating is Required"],
        min:1,
        max:10
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'userModel',
        required:[true,"user review Must BElong to a user"]
    },
    plan:{
        type:mongoose.Schema.ObjectId,
        ref:'planModel',
        required:[true,"review of a plan must belong to a plan"]
    }
});
// pre -> find finOne, findById
reviewSchema.pre(/^find/,function(next){
    this.populate({
        //selected fields from object
        path:"user",
        select:"name profileImage"
    }).populate("plan");//whole object
    next();
})
//model
const reviewModel =mongoose.model('reviewModel',reviewSchema);
module.exports= reviewModel;