const mongoose=require('mongoose');
const {db_link}= require("../Secret/secret");

mongoose.connect(db_link)
.then(function(db){
    console.log("DB CONNECTED");
})
.catch(function(err){
    console.log(err);
})

const planSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        maxLength:[20,'plan name should not exceed more than 20 charcter']
    },
    duration:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:[true,'price not entered']
    },
    ratingAverage:{
        type:Number,
        default:0
    },
    discount:{
        type:Number,
        validate:[function(){
            return this.discount<100;
        },'discount should not exceed price']
    },
    noOfReviews:{
        type:Number,
        default:0
    }
});

//model
const planModel =mongoose.model('planModel',planSchema);
module.exports= planModel;



