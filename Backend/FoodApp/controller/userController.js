const userModel= require("../models/userModel")

// get info for a particular user
module.exports.getUser=async function getUser(req,res){
    try{
        
        let id=req.id;
        // console.log(req.params.id);
        let user= await userModel.findById(id);
        if(user){
            res.json({
                message:"user found",
                user:user
            })
        }
        else{
            res.json({
                message:"user not found"
            })
        }
    }
    catch(err){
        res.json({
            message:err.message
        })
    }
}

//get allUsers For admin
module.exports.getAllUser=async function getAllUser(req,res){
    try{
        //console.log("user delivered Successfully");
        //-> all documents ->
        let allUsers=await userModel.find();
        //let user= await userModel.findOne({name:"mario"});
        if(allUsers){
            res.json({
                message:"lists of all users",
                data:allUsers
            });
        }
        else{
            res.json({
                message:"no users found!!"
            })
        }
    }
    catch(err){
        res.json({
            message:err.message
        })
    }
    
}

//update in nomgo db
module.exports.updateUser=async function updateUser(req,res){
    try{
        
        let id= req.params.id;
        let dataToBeUpdated= req.body;
        let user = await userModel.findById(id);
        if(user){
            const keys=[];
            for(let key in dataToBeUpdated){
                keys.push(key);
            }

            for(let i=0;i<keys.length;i++){
                user[keys[i]]=dataToBeUpdated[keys[i]];
            }
            const updatedData = await userModel.findOneAndUpdate({_id:id},user);
            res.json({
                message:"Data updated",
                data: user
            })
        }
        else{
            res.json({
                message:"user not found!!"
            })
        }
    }
    catch(err){
        res.json({
            message:err.message
        })
    }
}

//delete in mongo db
module.exports.deleteUser=async function deleteUSer(req,res){
    try{
        let id= req.params.id;
        let user= await userModel.findByIdAndDelete(id);
        if(!user){
            res.json({
                message:"user not found!!!!"
            })
            return;
        }
        res.json({
            message:"User deleted",
            user:user
        })
    }
    catch(err){
        res.json({
            message:err.message
        })
    }
}

module.exports.updateProfileImage= async function updateProfileImage(req,res){
    res.json({
        message:"file uploaded Successfully"
    })
}
