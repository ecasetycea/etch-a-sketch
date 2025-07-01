const GRID_RESOLUTION = [16, 16]; //[width, height]
const GRID_WIDTH = 960; //px


createGrid();


function createGrid() {
    const gridContainer = document.querySelector(".gridContainer");
    const boxSize = getBoxSize() + "px";

    for(let i=0; i<GRID_RESOLUTION[0]; i++) {
        let gridColumn = document.createElement("div");
        gridColumn.classList.add("gridColumn");
        
        for(let j=0; j<GRID_RESOLUTION[1]; j++) {
            let gridBox = document.createElement("div");
            gridBox.classList.add("gridBox");
            gridBox.textContent = String(j) + ',' + String(i);
            gridBox.style.width = boxSize;
            gridBox.style.height = boxSize;

            gridColumn.appendChild(gridBox);
        }
        gridContainer.appendChild(gridColumn);
    }
}

function getBoxSize() {
    let out = Math.max(...GRID_RESOLUTION);
    out = GRID_WIDTH / out;
    out = Math.floor(out);
    return out; 
}

function resizeBoxes() {
    //dynamically scale container with viewport
}