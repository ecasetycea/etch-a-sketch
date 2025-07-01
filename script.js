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
    //addHoverTrailColor();
    //addShadeTrail();
    addShadeTrailColor();
}

//returns array of strings
function getRandomRGBArray() {
    let colors = [0,0,0];
    colors.forEach( (e) => {
        let color = Math.floor( 256*Math.random() );
        colors[colors.indexOf(e)] = String(color);
    })
    return colors;
}

//returns string of hex
function getRandomHexColor() {
    let colors = getRandomRGBArray();
    colors.forEach( (e) => {
        let color = Number(colors.indexOf(e));
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

//string = rgba/hsla(###, ###, ###, #.#), needs the spaces after commas
function addBackgroundOpacity(string, percentage) {
    //if opacity is 1, then rgba turns to rgb on its own.
    //the if statement makes sure no exception is thrown
    if(string.slice(0,4) === 'rgba') {
        let colArr = string.split(",");
        let opacity = colArr[3];
        opacity = opacity.slice(1,-1);
        opacity *= 100;
        opacity += percentage;
        //set max opacity if overshot
        if(opacity > 100) opacity = 100;
        opacity /= 100;
        colArr[3] = " " + opacity + ")";
        let colStr = String(colArr);
        return colStr;
    }
    return string;
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

function addHoverTrailColor() {
    gridContainer.addEventListener("mouseover", (e) => {
        if(!e.target.classList.contains("isColored")) {
            e.target.style.backgroundColor = getRandomHexColor();
            e.target.classList.add("isColored");
        }
    });
}

function addShadeTrail() {
    gridContainer.addEventListener("mouseover", (e) => {
        if(e.target.classList.contains("isColored")) {
            if(e.target.classList.contains("isShaded")) {
                newColor = addBackgroundOpacity(e.target.style.backgroundColor, 10);
                e.target.style.backgroundColor = newColor;
            }
        } else {
            e.target.classList.add("isShaded");
            e.target.classList.add("isColored");
            e.target.style.backgroundColor = "rgba(0, 0, 0, 0.1)"
        }
    })
}

function addShadeTrailColor() {
    gridContainer.addEventListener("mouseover", (e) => {
        if(e.target.classList.contains("isColored")) {
            if(e.target.classList.contains("isShaded")) {
                newColor = addBackgroundOpacity(e.target.style.backgroundColor, 10);
                e.target.style.backgroundColor = newColor;
            }
        } else {
            e.target.classList.add("isShaded");
            e.target.classList.add("isColored");
            colors = getRandomRGBArray();
            colorStr = `rgba(${colors[0]}, ${colors[1]}, ${colors[2]}, 0.1)`;
            e.target.style.backgroundColor = colorStr;
        }
    })
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
