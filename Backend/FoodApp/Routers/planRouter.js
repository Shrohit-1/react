const express= require('express');
const { protectRoute, isAuthorised } = require('../controller/authController');
const {getAllPlans,getPlan,createPlan,updatePlan,deletePlan,top3Plans} = require('../controller/planController');
const planRouter= express.Router();


//All available plans
planRouter.route('/allplans')
.get(getAllPlans)

//ownPlan-> lgin necessary
planRouter.use(protectRoute);
planRouter.route('/plan/:id')
.get(getPlan)

//only authorized should be able to do these
planRouter.use(isAuthorised(['admin','restaurantowner']));
planRouter.route('/crudPlan')
.post(createPlan)


planRouter.route('/crudPlan/:id')
.patch(updatePlan)
.delete(deletePlan);

planRouter.route('/top3plans')
.get(top3Plans);

module.exports = planRouter;