const DEFAULT_GRID_RESOLUTION = [16, 16]; //[width, height]
const toolbarConst = 150; //magic number to account for margins
const GRID_SIZE = [window.innerWidth, window.innerHeight]; //[width, height] (px)

//document references
const gridContainer = document.querySelector(".gridContainer");
const newButton = document.querySelector("#new");
const defaultButton = document.querySelector("#default");
const resetButton = document.querySelector("#reset");
const gridlinesButton = document.querySelector("#gridlines");
const buttons = document.querySelector(".buttons");
const colorSelect = document.querySelector(".colorSelect");
let currentGridRes = DEFAULT_GRID_RESOLUTION.slice();
let gridBoxes; //assigned after creation
let mouseDown = false; //used to draw only with held click

setup();


function setup() {
    document.body.addEventListener("mousedown", () => {mouseDown=true;} );
    document.body.addEventListener("mouseup", () => {mouseDown=false;} );

    //add event listener for preselected button
    gridContainer.addEventListener("mouseover", trail);
    
    setupButtonEventListeners();
    createGrid(...DEFAULT_GRID_RESOLUTION);
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
        let color = Number(colors[colors.indexOf(e)]);
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

    const boxWidth  = gridWidth/gridResWidth;
    const boxHeight = (gridHeight-toolbarConst)/gridResHeight;
    const boxSide = Math.floor(Math.min(boxWidth, boxHeight));

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
    buttons.addEventListener("click", (e) => {
        let btnId = e.target.id;
        switch(btnId) {
            case "new":
                let width = getNumberInput("Enter resolution width");
                let height = getNumberInput("Enter resolution height");
                
                //handle cancellation or 0 entry
                if(!width) width = DEFAULT_GRID_RESOLUTION[0];
                if(!height) height = DEFAULT_GRID_RESOLUTION[1];
                
                //handle oversized grid
                if(width > 100) width = 100;
                if(height > 100) height = 100;

                resetGrid(width, height);
                break;
            case "default":
                resetGrid(16,16);
                break;
            case "reset":
                resetGrid(...currentGridRes);
                break;
            case "gridlines":
                e.target.classList.toggle("isSelected");
                gridBoxes.forEach( (gridBox) => {
                    gridBox.classList.toggle("gridBoxBorder");
                })
                break;
        }
    });
    colorSelect.addEventListener("click", (e) => {
        let btnId = e.target.id;
        let selected = document.querySelector(".isSelected");
        //if clicking the same button, return (do nothing)
        if(btnId === selected.id) return e;
        
        //else change the selected...
        selected.classList.remove("isSelected");
        e.target.classList.add("isSelected");
        //...and handle event listeners
        removeTrailEventListeners();
        switch(btnId) {
            case "trail":
                gridContainer.addEventListener("mouseover", trail);
                break;
            case "trailColor":
                gridContainer.addEventListener("mouseover", trailColor);
                break;
            case "shadeTrail":
                gridContainer.addEventListener("mouseover", shadeTrail);
                break;
            case "shadeTrailColor":
                gridContainer.addEventListener("mouseover", shadeTrailColor);
        }
    });
}

function removeTrailEventListeners() {
    gridContainer.removeEventListener("mouseover", trail);
    gridContainer.removeEventListener("mouseover", trailColor);
    gridContainer.removeEventListener("mouseover", shadeTrail);
    gridContainer.removeEventListener("mouseover", shadeTrailColor);
}

function trail(e) {
    if(mouseDown) {
        e.target.classList.add("isBlack");
        e.target.classList.add("isColored");    
    }
}

function trailColor(e) {
    if(mouseDown){
        if(!e.target.classList.contains("isColored")) {
            e.target.style.backgroundColor = getRandomHexColor();
            e.target.classList.add("isColored");
        }
    }
}

function shadeTrail(e) {
    if(mouseDown) {
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
    }
}

function shadeTrailColor(e) {
    if(mouseDown) {
        if(e.target.classList.contains("isColored")) {
            if(e.target.classList.contains("isColorShaded")) {
                newColor = addBackgroundOpacity(e.target.style.backgroundColor, 10);
                e.target.style.backgroundColor = newColor;
            }
        } else {
            e.target.classList.add("isColorShaded");
            e.target.classList.add("isColored");
            colors = getRandomRGBArray();
            colorStr = `rgba(${colors[0]}, ${colors[1]}, ${colors[2]}, 0.1)`;
            e.target.style.backgroundColor = colorStr;
        }
    }
}
/* ================*/


/* GRID */
function createGrid(...gridResolution) {
    currentGridRes = gridResolution;
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
            if(j === gridResolution[1]-1) gridBox.classList.add("isOnBottomRow");
            if(i === 0) gridBox.classList.add("isOnLeftColumn");
            if(i === gridResolution[0]-1) gridBox.classList.add("isOnRightColumn");

            gridColumn.appendChild(gridBox);
        }
        gridContainer.appendChild(gridColumn);
    }
    //bind boxes to global variable for access
    //(also updates when grid resets)
    gridBoxes = document.querySelectorAll(".gridBox");
    if(gridlinesButton.classList.contains("isSelected")) {
        gridBoxes.forEach( box => {
            box.classList.add("gridBoxBorder");
        });
    }
        
}

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
