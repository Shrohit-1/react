const express= require('express');
const path= require('path')
const app= express();

app.get('/',(req,res)=>{
    res.sendFile("./index.html",{root: path.join(__dirname)});
})

app.get('/about',(req,res)=>{
    res.sendFile('./about.html',{root: path.join(__dirname)});
})

//redirects
app.get('/about-us',(req,res)=>{
    res.redirect('/about')
});

//404 page
//middleware
//at the end always so it will run after performing all checks on path above us if placed above all our app will always return 404
app.use((req,res)=>{
    res.status(404).sendFile('./404.html',{root:path.join(__dirname)});
})

app.listen(8080);