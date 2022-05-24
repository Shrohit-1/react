let optionsCont= document.querySelector(".options-cont");
let optionsFlag=true;

let toolsCont= document.querySelector(".tools-cont");

let pencil= document.querySelector(".pencil");
let pencilCont= document.querySelector(".pencil-tool-cont");
let pencilFlag=false;

let eraser= document.querySelector(".eraser");
let eraserCont= document.querySelector(".eraser-tool-cont");
let eraserFlag= false;

let sticky= document.querySelector(".sticky");

let upload= document.querySelector(".upload");




optionsCont.addEventListener("click",(e)=>{
    optionsFlag = !optionsFlag;

    if(optionsFlag === true){
        optionsCont.children[0].classList.remove("fa-times");
        optionsCont.children[0].classList.add("fa-bars");
        toolsCont.style.display="flex";
    }
    else{
        optionsCont.children[0].classList.remove("fa-bars");
        optionsCont.children[0].classList.add("fa-times");
        toolsCont.style.display="none";
        pencilCont.style.display="none";
        eraserCont.style.display="none";
        pencilFlag=false;
        eraserFlag=false;
    }
});

pencil.addEventListener("click", (e)=>{
    pencilFlag= !pencilFlag;

    if(pencilFlag==true){
        pencilCont.style.display="block";
    }
    else{
        pencilCont.style.display="none";
    }
})

eraser.addEventListener("click",(e)=>{
    eraserFlag= !eraserFlag;
    if(eraserFlag==true){
        eraserCont.style.display="flex";
    }
    else{
        eraserCont.style.display="none";
    }

})

sticky.addEventListener("click",(e)=>{
    let stickyCont= document.createElement("div");
    stickyCont.classList.add("sticky-cont");
    stickyCont.innerHTML=`
    <div class="header-cont">
            <div class="minimize"></div>
            <div class="remove"></div>
        </div>
        <div class="note-cont">
            <textarea spellcheck="false"></textarea>
    </div>`;
    document.body.appendChild(stickyCont);
    
    stickyCont.addEventListener("mousedown",(e)=>{
        dragAndDrop(stickyCont,e);
    })

    let minimize=stickyCont.querySelector(".minimize");
    let remove= stickyCont.querySelector(".remove");
    minimize.addEventListener("click",(e)=>{
        console.log("minimize");
        let noteCont = stickyCont.querySelector(".note-cont");
        let display = getComputedStyle(noteCont).getPropertyValue("display");
        if (display === "none") noteCont.style.display = "block";
        else noteCont.style.display = "none";
    })

    remove.addEventListener("click",(e)=>{
        stickyCont.remove();
    })
})

upload.addEventListener("click",(e)=>{
    let input= document.createElement("input");
    input.setAttribute("type","file");
    input.click();

    input.addEventListener("change",(e)=>{
        let file=input.files[0];
        let url= URL.createObjectURL(file);
        let stickyCont= document.createElement("div");
        stickyCont.classList.add("sticky-cont");
        stickyCont.innerHTML=`
        <div class="header-cont">
                <div class="minimize"></div>
                <div class="remove"></div>
            </div>
            <div class="note-cont">
            <img src="${url}">
        </div>`;
        document.body.appendChild(stickyCont);
        
        stickyCont.addEventListener("mousedown",(e)=>{
            dragAndDrop(stickyCont,e);
        })

        let minimize=stickyCont.querySelector(".minimize");
        let remove= stickyCont.querySelector(".remove");
        minimize.addEventListener("click",(e)=>{
            console.log("minimize");
            let noteCont = stickyCont.querySelector(".note-cont");
            let display = getComputedStyle(noteCont).getPropertyValue("display");
            if (display === "none") noteCont.style.display = "block";
            else noteCont.style.display = "none";
        })

        remove.addEventListener("click",(e)=>{
            stickyCont.remove();
        })
    })
})

function dragAndDrop(element, event) {
    let shiftX = event.clientX - element.getBoundingClientRect().left;
    let shiftY = event.clientY - element.getBoundingClientRect().top;

    element.style.position = 'absolute';
    element.style.zIndex = 1000;

    moveAt(event.pageX, event.pageY);

    // moves the ball at (pageX, pageY) coordinates
    // taking initial shifts into account
    function moveAt(pageX, pageY) {
        element.style.left = pageX - shiftX + 'px';
        element.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }

    // move the ball on mousemove
    document.addEventListener('mousemove', onMouseMove);

    // drop the ball, remove unneeded handlers
    element.onmouseup = function () {
        document.removeEventListener('mousemove', onMouseMove);
        element.onmouseup = null;
    };
}