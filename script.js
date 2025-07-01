const GRID_RESOLUTION = [20, 16]; //[width, height]
const GRID_SIZE = [960, 960]; //[width, height] (px)

const gridContainer = document.querySelector(".gridContainer");

createGrid();


function createGrid() {
    setGridSize(...GRID_SIZE);
    const boxSize = getBoxSize() + "px";

    //loop columns
    for(let i=0; i<GRID_RESOLUTION[0]; i++) {
        let gridColumn = document.createElement("div");
        gridColumn.classList.add("gridColumn");
        
        //loop rows
        for(let j=0; j<GRID_RESOLUTION[1]; j++) {
            let gridBox = document.createElement("div");
            gridBox.classList.add("gridBox");
            gridBox.style.width = boxSize;
            gridBox.style.height = boxSize;
            
            //for debug
            gridBox.textContent = String(j) + ',' + String(i);
            
            //add border missing from some boxes
            if(j === 0) gridBox.classList.add("isOnTopRow");
            if(i === 0) gridBox.classList.add("isOnLeftColumn");

            gridColumn.appendChild(gridBox);
        }
        gridContainer.appendChild(gridColumn);
    }

    addEL();
}

function addEL() {
    gridContainer.addEventListener( "mouseover", (e) => {
        e.target.classList.add("isColored");
    });
}

function setGridSize(width, height) {
    gridContainer.style.width = width + "px";
    gridContainer.style.height = height + "px";
}

function getBoxSize() {
    let maxRes = Math.max(...GRID_RESOLUTION);
    let minSize = Math.min(...GRID_SIZE);
    let boxSide = minSize / maxRes;
    return Math.floor(boxSide);
}

function resizeBoxes() {
    //dynamically scale container with viewport
}