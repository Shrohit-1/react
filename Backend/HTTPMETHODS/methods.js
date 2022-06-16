const express= require('express');
const path= require('path')
const app= express();

app.use(express.json());
app.listen('8080');

users={};

//get
app.get('/user',(req,res)=>{
    res.send(users);
})

//post
app.post('/user',(req,res)=>{
    users=(req.body);
    res.json({
        message:"Data Successfully Recieved",
        user:req.body
    })
})

//update-patch

app.patch('/user',(req,res)=>{
    let data=req.body;
    for(key in data ){
        users[key]=data[key]
    }
    res.json({
        message:"Data Updated Successfully"
    })
})

// delete

app.delete('/user',(req,res)=>{
    users={};
    res.json({
        message:"DATA DELETED"
    })
})
