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
        let planId= req.params.id;
        let plan= planModel.findById(planId);
        let data= req.body;
        let review= await reviewModel.create(data);
        plan.ratingAverage= plan.ratingAverage.value
    }
    catch(err){
        res.json({
            message:err.message
        })
    }
}

module.exports.getPlanReviews=async function getPlanReviews(req,res){
    try{
        let id= req.params.id;
        const review= await reviewModel.findById(id);
        if(review){
            res.json({
                message:"review Found",
                data:review
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

module.exports.updateReview=async function updateReview(req,res){
    try{

    }
    catch(err){
        res.json({
            message:err.message
        })
    }
}

module.exports.deleteReview=async function deleteReview(req,res){
    try{
        let id= req.params.id;
        let review= await reviewModel.findByIdAndDelete(id);
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