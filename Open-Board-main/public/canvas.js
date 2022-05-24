
let canvas= document.querySelector("canvas");
canvas.width= window.innerWidth;
canvas.height= window.innerHeight;

//API
const tool = canvas.getContext('2d');
let lineWidth=document.querySelector(".pencil-width");
let lineColor="black";

let track=0;
let undoredoArr=[];
undoredoArr.push(canvas.toDataURL());


//Pencil
let pencil_color="black";
let pencil_width_elem= document.querySelector(".pencil-width");

pencil.addEventListener("click",(e)=>{
    lineColor=pencil_color;
    lineWidth=pencil_width_elem.value;
})
//Changing-color
let colorDivArr= document.querySelectorAll(".pencil-color") ;
for(let i=0;i<colorDivArr.length;i++){
    colorDivArr[i].addEventListener("click",(e)=>{
        pencil_color=colorDivArr[i].classList[0];
        lineColor=pencil_color;
        tool.strokeStyle=pencil_color;
    })
}
//changing-width
pencil_width_elem.addEventListener("change",(e)=>{
    lineWidth=pencil_width_elem.value;
})



//eraser
let eraser_width_Elem=document.querySelector(".eraser-width");
eraser.addEventListener("click",(e)=>{
    lineColor="white";
    lineWidth=eraser_width_Elem.value;
})
//Editing Thickness
eraser_width_Elem.addEventListener("change",(e)=>{
    lineWidth=eraser_width_Elem.value;
})





//Drawing
let mouseDownFlag=false;
canvas.addEventListener("mousedown",(e)=>{
    mouseDownFlag= true;
    let data={
        lineWidth,
        lineColor,
        x : e.clientX,
        y : e.clientY
    }
    socket.emit("beginPath",data);
    beginPath(data);
})
function beginPath(data){
    tool.lineWidth= data.lineWidth;
    tool.strokeStyle=data.lineColor;
    tool.beginPath();
    tool.moveTo(data.x,data.y);
}


canvas.addEventListener("mousemove",(e)=>{
    if(mouseDownFlag){
        let data={
            x:e.clientX,y:e.clientY
        }
        socket.emit("drawStroke",data);
    }
})
function drawStroke(data){
    tool.lineTo(data.x,data.y);
    tool.stroke();
}

canvas.addEventListener("mouseup",(e)=>{
    mouseDownFlag=false;
    undoredoArr.push(canvas.toDataURL());
    track=undoredoArr.length-1;
})




//DownLoad
let download= document.querySelector(".download");

download.addEventListener("click",(e)=>{
    let a= document.createElement("a");
    let url= canvas.toDataURL();
    a.download="canvas.jpg";
    a.href=url;
    a.click();
})




//undo
let undo= document.querySelector(".undo");
undo.addEventListener("click",(e)=>{
    if(track>0){
        track=track-1;
    }
    let trackObj={
        trackValue:track,
        undoRedoTracker:undoredoArr
    }
    socket.emit("undoRedo",trackObj);
})

//Redo
let redo= document.querySelector(".redo");
redo.addEventListener("click",(e)=>{
    if(track<undoredoArr.length-1){
        track=track+1;
    }
    let trackObj={
        trackValue:track,
        undoRedoTracker:undoredoArr
    }
    socket.emit("undoRedo",trackObj);
})

function unoRedoFunction(trackObj){
    track=trackObj.trackValue;
    undoredoArr=trackObj.undoRedoTracker;
    console.log(track);
    let img= new Image();
    img.src=undoredoArr[track];
    img.addEventListener("load",(e)=>{
        tool.clearRect(0, 0, canvas.width, canvas.height);
        tool.drawImage(img,0,0,canvas.width,canvas.height);
    });
    return;
}


//Socket
socket.on("beginPath",(data)=>{
    beginPath(data);
})

socket.on("drawStroke",(data=>{
    drawStroke(data);
}))

socket.on("undoRedo",(data)=>{
    unoRedoFunction(data);
})

