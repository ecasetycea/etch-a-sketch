const GRID_RESOLUTION = [16, 16]; //[width, height]
const GRID_SIZE = [960, 960]; //[width, height] (px)

const gridContainer = document.querySelector(".gridContainer");
const resetButton = document.querySelector("#reset");

setupButtonEventListeners();

createGrid();

function createGrid() {
    const boxSize = getBoxSize()
    setActualGridSize(boxSize, ...GRID_RESOLUTION);

    //loop columns
    for(let i=0; i<GRID_RESOLUTION[0]; i++) {
        let gridColumn = document.createElement("div");
        gridColumn.classList.add("gridColumn");
        
        //loop rows
        for(let j=0; j<GRID_RESOLUTION[1]; j++) {
            let gridBox = document.createElement("div");
            gridBox.classList.add("gridBox");
            gridBox.style.width = boxSize + "px";
            gridBox.style.height = boxSize + "px";
            
            //add border missing from some boxes
            if(j === 0) gridBox.classList.add("isOnTopRow");
            if(i === 0) gridBox.classList.add("isOnLeftColumn");
            
            gridColumn.appendChild(gridBox);
            
            //for debug
            gridBox.textContent = String(j) + ',' + String(i);
        }
        gridContainer.appendChild(gridColumn);
    }

    addEL();
}

/* EVENT LISTENERS */
function setupButtonEventListeners() {
    resetButton.addEventListener("click", () => {
        resetGrid();
    });
}

function addEL() {
    gridContainer.addEventListener("mouseover", (e) => {
        e.target.classList.add("isColored");
    });
}
/* ================*/


/* GRID */
function resetGrid() {
    gridContainer.innerHTML = '';
    createGrid();
}

function setGridSize(width, height) {
    gridContainer.style.width = width + "px";
    gridContainer.style.height = height + "px";
}

function getActualGridSize(boxSize, ...gridRes) {
    let width = boxSize * gridRes[0];
    let height = boxSize * gridRes[1];
    return [width, height];
}

function setActualGridSize(boxSize, ...gridRes) {
    let size = getActualGridSize(boxSize, ...gridRes);
    setGridSize(...size);
}
/* ===================*/

function getBoxSize() {
    let maxRes = Math.max(...GRID_RESOLUTION);
    let minSize = Math.min(...GRID_SIZE);
    let boxSide = minSize / maxRes;
    return Math.floor(boxSide);
}

function resizeBoxes() {
    //dynamically scale container with viewport
}