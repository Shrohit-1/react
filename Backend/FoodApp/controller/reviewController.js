const reviewModel = require("../models/reviewModel")
const planModel= require('../models/planModel');

module.exports.getAllReviews=async function getAllReviews(req,res){
    try{
        const reviews= await reviewModel.find();
        if(reviews){
            res.json({
                message:"All reviews",
                data:reviews
            })
        }
        else{
            res.json({
                message:"No reviews Available"
            })
        }
    }
    catch(err){
        res.json({
            message:err.message
        })
    }
}

module.exports.top3reviews=async function top3reviews(req,res){
    try{
        const reviews= await reviewModel.find().sort({rating:-1}).limit(3);
        if(reviews){
            res.json({
                message:"Top 3 reviews",
                data:reviews
            })
        }
        else{
            res.json({
                message:"No reviews Available"
            })
        }
    }
    catch(err){
        res.json({
            message:err.message
        })
    }
}

module.exports.createReview=async function createReview(req,res){
    try{
        let planId= req.params.plan;
        let plan=await planModel.findById(planId);
        let data= req.body;
        let review= await reviewModel.create(data);
        plan.noOfReviews= plan.noOfReviews+1;
        plan.ratingAverage= (plan.ratingAverage*(plan.noOfReviews-1) + data.rating)/plan.noOfReviews;
        await plan.save();
        res.json(({
            message:"review created",
            data:review
        }))
    }   
    catch(err){
        res.json({
            message:err.message
        })
    }
}
//Gives reviews for a corresponding plan
//fetch all reviews and select review having same plan._id as our selected plan
module.exports.getPlanReviews=async function getPlanReviews(req,res){
    try{
        let planId= req.params.id;
        const Allreviews= await reviewModel.find();
        let reviews= Allreviews.filter((review)=>{
            return review.plan._id==planId
        });
        if(reviews){
            res.json({
                message:"review Found",
                data:reviews
            })
        }
        else{
            res.json({
                message:"No reviews Available for this id"
            })
        }
    }
    catch(err){
        res.json({
            message:err.message
        })
    }
}
//here we will get plan id from the url as we will select our plan first then when we click on the review which we want to update we will recieve its id in the req body
module.exports.updateReview=async function updateReview(req,res){
    try{
        let planId= req.params.id;
        let reviewId= req.body.id;
        let dataToBeupdated= req.body;
        let keys=[];
        let review=await reviewModel.findById( reviewId );
        for(let key in dataToBeupdated){
            if(key=="id"){
                continue;
            }
            keys.push(key);
        }
        for(let i=0;i<keys.length;i++){
            review[keys[i]]=dataToBeupdated[keys[i]];
        }
        await review.save();
        res.json({
            message:"review Updated",
            data:review
        })
    }
    catch(err){
        res.json({
            message:err.message
        })
    }
}

module.exports.deleteReview=async function deleteReview(req,res){
    try{
        let id= req.body.id;
        let planId= req.params.plan;
        let review= await reviewModel.findByIdAndDelete(id);
        let plan = await planModel.findById(planId);
        plan.noOfReviews= plan.noOfReviews-1;
        plan.ratingAverage= ( plan.ratingAverage*(plan.noOfReviews+1) - review.rating)/plan.noOfReviews;
        
        await plan.save();
        res.json({
            message:"user deleted SuccessFully",
            review:review
        })
    }
    catch(err){
        res.json({
            message:err.message
        })
    }
}