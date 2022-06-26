const planModel= require('../models/planModel');


module.exports.getAllPlans= async function getAllPlans(req,res){
    try{
        let plans= await planModel.find();
        if(plans){
            res.json({
                message:"all plans retrieved",
                Allplans:plans
            })
        }
        else{
            res.json({
                message:"no plans Available"
            })
        }
    }
    catch(err){
        res.status(500).json({
            message:err.message
        })
    }
    
}

module.exports.getPlan= async function getPlan(req,res){
    try{
        let id= req.params.id;
        let plan= await planModel.findById(id);
        if(plan){
            res.json({
                message:"plan Found",
                plan:plan
            })
        }
        else{
            res.json({
                message:"no plan found"
            })
        }
    }
    catch(err){
        res.status(500).json({
            message:err.message
        })
    }
}

module.exports.createPlan= async function createPlan(req,res){
    try{
        let planData= req.body;
        let doc= await planModel.create(planData);
        return res.json({
            message:"plan created SuccessFully",
            data:doc
        });
    }
    catch(err){
        res.status(500).json({
            message:err.message
        })
    }
    
}

module.exports.updatePlan= async function updatePlan(req,res){
    try{
        let id= req.params.id;
        let dataToBeUpdated= req.body;
        if(!dataToBeUpdated){
            return res.json({
                message:"No data to be updated"
            })
        }
        let keys=[];
        for(let key in dataToBeUpdated){
            keys.push(key);
        }
        let plan= await planModel.findById(id);
        if(!plan){
            res.json({
                message:"Invalid ID"
            })
        }
        for(let i=0;i<keys.length;i++){
            plan[keys[i]]=dataToBeUpdated[keys[i]];
        }
        await plan.save();
        res.json({
            message:"plan Updated Successfully",
            plan:plan
        });
    }
    catch(err){
        res.status(500).json({
            message:err.message
        });
    }
}

module.exports.deletePlan= async function deletePlan(req,res){
    try{
        let id= req.params.id;
        let doc= await planModel.findByIdAndDelete(id);
        return res.json({
            message:"plan deleted SuccessFully",
            data:doc
        });
    }
    catch(err){
        res.status(500).json({
            message:err.message
        })
    }
}

// get top 3 plans
module.exports.top3Plans= async function top3Plans(req,res){
    try{
        let Threeplans=await planModel.find().sort({ratingAverage:-1}).limit(3);
        return res.json({
            message:"top Three Plans",
            data: Threeplans
        })
    }
    catch(err){

    }
    

}