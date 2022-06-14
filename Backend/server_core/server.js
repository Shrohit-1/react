//server creation

//1. http module

const http= require('http');
const fs= require('fs');

const server = http.createServer((req,res)=>{
    console.log("request has been made from browser to server");
    console.log(req.method);
    console.log(req.url);
    //response is sent from here through res
    res.setHeader('content-type', 'text/html');
    
    let path="";
    switch(req.url){
        case '/':
            path = './index.html';
            //success
            res.statusCode=200;
            break;
        case '/about':
            //success
            path='./about.html';
            res.statusCode=200;
            break;
        case '/about-u':
            //redirect to /about
            res.statusCode=301;
            res.setHeader('Location','\about');
            res.end();
            break;
        default:
            res.statusCode=404;
            path= "./404.html";
    }
    fs.readFile(path,(err,data)=>{
        if(err){
            console.log(err);
        }
        else{
            res.end(data);
        }
    })
});

//port no. , host, callback func
server.listen(8080, 'localhost',()=>{
    console.log("server is listening on port no. 8080");
});