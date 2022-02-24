const DEFAULT_COLOR = "Black";
const DEFAULT_MODE = "pen";
const DEFAULT_SIZE = 16;

const gridCon = document.querySelector('.container');
const colorBtn = document.querySelector('#color');
const penBtn = document.querySelector('.pen');
const rainbowBtn = document.querySelector('.rainbow');
const eraserBtn = document.querySelector('.eraser');
const clearBtn =document.querySelector('.clear');
const sizeSlider = document.querySelector('.sizeslider');
const sizeDisplay = document.querySelector('.sizedisplay');

let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;

colorBtn.onchange = (e)=> updateColor(e.target.value);
penBtn.addEventListener('click', ()=>updateMode('pen'));
rainbowBtn.addEventListener('click', ()=>updateMode ('rainbow'));
eraserBtn.addEventListener('click' , ()=>updateMode('eraser'));
clearBtn.addEventListener('click', ()=> clearbg());
sizeSlider.addEventListener('mousemove' ,(e)=> displaySize(e.target.value));
sizeSlider.onchange = (e) => updateSize(e.target.value);

function newSize(newsize){
    currentSize = newsize;
}

function updateSize(newsize){
    newSize(newsize);
    displaySize(newsize);
    clearbg();
}

function displaySize(size){
    sizeDisplay.textContent = `${size}X${size}`;
}

function clearbg(){
    reload();
    grid(currentSize);
}

function reload(){
    gridCon.innerHTML = "";
}

function updateMode(newMode){
    activeBtn(newMode);
    currentMode = newMode;
}

function updateColor(newColor){
    currentColor = newColor;
}

function setNewColor(){
    updateColor();
    fillBg();
}

let mouseDown = false;
document.body.onmousedown = ()=> (mouseDown=true);
document.body.onmouseup = ()=> (mouseDown=false);

function grid(currentSize){
    gridCon.style.gridTemplateColumns = `repeat(${currentSize},1fr)`;
    gridCon.style.gridTemplateRows = `repeat(${currentSize},1fr)`;

    for(let i=1;i<=currentSize*currentSize;i++){
        let gridEle = document.createElement('div');
        gridEle.classList.add("gridEle");
        gridEle.addEventListener('mouseover', fillBg );
        gridEle.addEventListener('mousedown', fillBg);
        gridCon.appendChild(gridEle);
    }
}

function fillBg(e){
    if(e.type === 'mouseover' && !mouseDown) return;
    if(currentMode === "pen"){
        e.target.style.backgroundColor = currentColor;
    }
    else if(currentMode === "rainbow"){
        e.target.style.backgroundColor = rainbowcolor();
    }
    else{
        e.target.style.backgroundColor = "white";
    }
}

function activeBtn(newMode){
    if(currentMode === 'pen'){
        penBtn.classList.remove('active');
    }
    else if(currentMode === 'rainbow'){
        rainbowBtn.classList.remove('active');
    }
    else{
        eraserBtn.classList.remove('active');
    }

    if(newMode === 'pen'){
        penBtn.classList.add('active');
    }
    else if(newMode === 'rainbow'){
        rainbowBtn.classList.add('active');
    }
    else{
        eraserBtn.classList.add('active');
    }
}

function rainbowcolor(){
    let R = Math.floor(Math.random()*256);
    let G = Math.floor(Math.random()*256);
    let B = Math.floor(Math.random()*256);

    let newColor = `rgb(${R},${G},${B})`
    return newColor;
}

grid(currentSize);