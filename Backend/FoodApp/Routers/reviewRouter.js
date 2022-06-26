const express= require('express');
const { protectRoute} = require('../controller/authController');
const reviewRouter= express.Router();
const {getAllReviews,createReview,top3reviews,updateReview,deleteReview,getPlanReviews} = require('../controller/reviewController')
reviewRouter.route('/all')
.get(getAllReviews)

reviewRouter.route('/top3')
.get(top3reviews);



reviewRouter.use(protectRoute);
reviewRouter.route('/crud:plan')
.post(createReview);

reviewRouter.route('/:id')
.get(getPlanReviews);

reviewRouter.route('crud/:id')
.patch(updateReview)
.delete(deleteReview)



module.exports= reviewRouter