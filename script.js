const DEFAULT_COLOR = "Black";
const DEFAULT_SIZE = 16;

const container = document.querySelector('#container');
const clearBtn = document.querySelector('.clear');
clearBtn.addEventListener('click',()=> location.reload());

let mouseDown = false;
document.body.onmousedown = ()=> (mouseDown = true);
document.body.onmouseup = ()=> (mouseDown = false);

function gridSetUp(size){
    container.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    container.style.gridTemplateRows = `repeat(${size}, 1fr)`
    for(let i = 0; i<size*size;i++){
        let grid = document.createElement('div');
        grid.classList.add("gridEle");
        grid.addEventListener('mouseover' , changeColor);
        grid.addEventListener('mousedown', changeColor);
        container.appendChild(grid);
    }
}


function changeColor(e){
    if(e.type === 'mouseover' && !mouseDown) return;
    e.target.style.backgroundColor = 'black';
}


gridSetUp(20);