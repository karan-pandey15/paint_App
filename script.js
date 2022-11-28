const canvas = document.querySelector("canvas");

const clear = document.getElementById("clear");

const board = document.getElementById("drawing-board");

clear.addEventListener("click",()=>{
    console.log("clear")
    board.innerText += "";
})

const savePainting = document.getElementById("Save-img");

savePainting.addEventListener("click",()=>{
    window.print();
})

toolBtns = document.querySelectorAll(".tool"),
fillColor = document.querySelector("#fill-color"),
sizeSlider = document.querySelector("#size-slider"),
ctx = canvas.getContext("2d");

let prevMouseX,prevMouseY,snapshot, isDrawing = false,
selectTool = "brush"
brushWidth= 4;



window.addEventListener("load",()=>{
    canvas.width = canvas.offsetWidth

    canvas.height = canvas.offsetHeight
})

const drawRect = (e) =>{
    if(!fillColor.checked){
    return ctx.strokeRect(e.offsetX,e.offsetY, prevMouseX-e.offsetX,prevMouseY-e.offsetY);
    }
    ctx.fillRect(e.offsetX,e.offsetY, prevMouseX-e.offsetX,prevMouseY-e.offsetY);
}

const startDraw = (e)=>{
    isDrawing = true;
    prevMouseX = e.offsetX;
    prevMouseY = e.offsetY;
    
    ctx.beginPath();
    ctx.lineWidth = brushWidth;
    snapshot = ctx.getImageData(0,0,canvas.width,canvas.height);

    snapshot = ctx.getImageData(0,0,canvas.width,canvas.height);
}

const drawTriangle = (e)=> {
    ctx.beginPath();
    ctx.moveTo(prevMouseX,prevMouseY);
    ctx.lineTo(e.offsetX,e.offsetY);
    ctx.stroke();
}


const drawing = (e) =>{
    if(!isDrawing) return;
    ctx.putImageData(snapshot,0,0);
    if(selectTool==="brush"){
        ctx.lineTo(e.offsetX,e.offsetY);
    ctx.stroke();
    }
    else if(selectTool==="rectangle"){
        drawRect(e);
    }
    else{
        drawTriangle(e);
    }
}

// const pauseDwaw = ()=>{
//     isDrawing = false;
// }

toolBtns.forEach(btn =>{
    btn.addEventListener("click",()=>{
        selectTool= btn.id;
        console.log(selectTool);
    })
})
sizeSlider.addEventListener("change",() => brushWidth=sizeSlider.value);

canvas.addEventListener("mousemove",drawing);

// canvas.addEventListener("click",pauseDwaw);

canvas.addEventListener("mouseup",()=>isDrawing = false);
canvas.addEventListener("mousedown",startDraw);
