const GRID_HEIGHT = 16;
const GRID_WIDTH = 16;


createGrid();


function createGrid() {
    const gridContainer = document.querySelector(".gridContainer");
    
    for(let i=0; i<GRID_WIDTH; i++) {
        let gridColumn = document.createElement("div");
        gridColumn.classList.add("gridColumn");
        
        for(let j=0; j<GRID_HEIGHT; j++) {
            let gridBox = document.createElement("div");
            gridBox.classList.add("gridBox");
            gridBox.textContent = String(j) + ',' + String(i);
            
            gridColumn.appendChild(gridBox);
        }
        gridContainer.appendChild(gridColumn);
    }
}