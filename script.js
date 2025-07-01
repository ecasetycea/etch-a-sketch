const GRID_RESOLUTION = [16, 16]; //[width, height]
const GRID_SIZE = [960, 960]; //[width, height] (px)

const gridContainer = document.querySelector(".gridContainer");
const newButton = document.querySelector("#new");
const defaultButton = document.querySelector("#default");
const resetButton = document.querySelector("#reset");

//alert(getNumberInput("test"));
setupButtonEventListeners();

createGrid(...GRID_RESOLUTION);

function createGrid(...gridResolution) {
    const boxSize = getBoxSize(...GRID_SIZE, ...gridResolution);
    setActualGridSize(boxSize, ...gridResolution);

    //loop columns
    for(let i=0; i<gridResolution[0]; i++) {
        let gridColumn = document.createElement("div");
        gridColumn.classList.add("gridColumn");
        
        //loop rows
        for(let j=0; j<gridResolution[1]; j++) {
            let gridBox = document.createElement("div");
            gridBox.classList.add("gridBox");
            gridBox.style.width = boxSize + "px";
            gridBox.style.height = boxSize + "px";
            
            //add border missing from some boxes
            if(j === 0) gridBox.classList.add("isOnTopRow");
            if(i === 0) gridBox.classList.add("isOnLeftColumn");
            
            gridColumn.appendChild(gridBox);
        }
        gridContainer.appendChild(gridColumn);
    }

    //addHoverTrail();
    addHoverTrailRandom();
}

function getRandomHexColor() {
    let colors = [0,0,0];
    colors.forEach( (e) => {
        let color = Math.floor( 256*Math.random() );
        color = color.toString(16);
        colors[colors.indexOf(e)] = color;
    });
    return '#' + colors.join('');
}

function getNumberInput(promptText) {
    let number;
    while(true) {
        number = Number(prompt(promptText));
        if(!isNaN(number)) {
            if(number%1 !== 0) {
                alert("Decimal number, rounding down");
                return Math.floor(number);
            }
            return number;
        }
        alert("Please enter a number");
    }
}

function getBoxSize(gridWidth, gridHeight, gridResWidth, gridResHeight) {
    let minSize = Math.min(gridWidth, gridHeight);
    let maxRes = Math.max(gridResWidth, gridResHeight);
    let boxSide = minSize / maxRes;
    return Math.floor(boxSide);
}
/*
function resizeBoxes() {
    //dynamically scale container with viewport
}
*/

/* EVENT LISTENERS */
function setupButtonEventListeners() {
    newButton.addEventListener("click", () => {
        let width = getNumberInput("Enter resolution width");
        let height = getNumberInput("Enter resolution height");
        resetGrid(width, height);
    });
    defaultButton.addEventListener("click", () => {
        resetGrid(16, 16);
    });
    resetButton.addEventListener("click", () => {
        resetGrid(...GRID_RESOLUTION);
    });
}

function addHoverTrail() {
    //capture container event to box for performance
    gridContainer.addEventListener("mouseover", (e) => {
        e.target.classList.add("isBlack");
        e.target.classList.add("isColored");
    });
}

function addHoverTrailRandom() {
    gridContainer.addEventListener("mouseover", (e) => {
        if(!e.target.classList.contains("isColored")) {
            e.target.style.backgroundColor = getRandomHexColor();
            e.target.classList.add("isColored");
        }
    });
}
/* ================*/


/* GRID */
function resetGrid(...gridResolution) {
    gridContainer.innerHTML = '';
    createGrid(...gridResolution);
}

function setGridSize(width, height) {
    gridContainer.style.width = width + "px";
    gridContainer.style.height = height + "px";
}

function getActualGridSize(boxSize, ResolutionWidth, ResolutionHeight) {
    let width = boxSize * ResolutionWidth;
    let height = boxSize * ResolutionHeight;
    return [width, height];
}

function setActualGridSize(boxSize, ...gridRes) {
    let size = getActualGridSize(boxSize, ...gridRes);
    setGridSize(...size);
}
/* ===================*/
