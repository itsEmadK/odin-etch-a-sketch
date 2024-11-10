let dimension = 10; //Must take it from input later
let isEraser = false;
let isRainbow = false;
let isShading = false;
let isLightening = false;

const TOGGLE_ERASER_BTN_ID = "toggle-eraser-btn";
const TOGGLE_RAINBOW_BTN_ID = "toggle-rainbow-btn";
const TOGGLE_SHADING_BTN_ID = "toggle-shading-btn";
const TOGGLE_LIGHTEN_BTN_ID = "toggle-lighten-btn";
const TOGGLE_GRID_LINES_BTN = "toggle-grid-lines-btn";
const CHANGE_GRID_SIZE_BTN_ID = "change-grid-size-btn";


const cell = document.createElement("div");
let cells = [];
cell.classList.add("square-cell");
cell.style.width = `calc(100%*(1/${dimension}))`;

const grid = document.querySelector(".grid");
for (let i = 0; i < dimension * dimension; i++) {
    cells.push(cell.cloneNode(false));
}

cells.forEach((c) => {
    grid.appendChild(c);
})

grid.addEventListener("mouseover", (event) => {
    if (![...event.target.classList].includes("grid")) {
        event.target.style.backgroundColor = "black";
    }
})


const colors = ["black", "blue", "red", "green", "gold"];
const colorItems = [...document.querySelectorAll(".color-item")];
for (let i = 0; i < 5; i++) { //TODO: remove the hardcoded value 5.
    colorItems[i].style.backgroundColor = colors[i];
}


const buttons = [...document.querySelectorAll(".btn")];
buttons.forEach((btn) => {
    btn.addEventListener("mouseenter", () => {
        btn.classList.toggle("hovered");
    })
    btn.addEventListener("mouseleave", () => {
        btn.classList.toggle("hovered");
    })
})

buttons.forEach((btn) => {
    btn.addEventListener("click", (event) => {
        event.target.classList.toggle("enabled");
        switch (event.target.id) {
            case TOGGLE_ERASER_BTN_ID:
                isEraser = !isEraser;
                break;
            case TOGGLE_RAINBOW_BTN_ID:
                isRainbow = !isRainbow;
                break;
            case TOGGLE_SHADING_BTN_ID:
                isShading = !isShading;
                break;
            case TOGGLE_LIGHTEN_BTN_ID:
                isLightening = !isLightening;
                break;
            case TOGGLE_GRID_LINES_BTN:
                cells.forEach((cell) => {
                    cell.classList.toggle("show-right-border-gray");
                    cell.classList.toggle("show-top-border-gray");
                });
                grid.classList.toggle("show-left-border-gray");
                grid.classList.toggle("show-bottom-border-gray");
                break;
            case CHANGE_GRID_SIZE_BTN_ID:
                const newDimension = prompt("Please enter the new grids dimension:");
                if (newDimension !== null) {
                    if (isNaN(+newDimension) || +newDimension <= 0) {
                        alert("Stop being a clown and enter a positive integer")
                    } else if (+newDimension > 100) {
                        alert("Dude, the limit is 100, what were you gonna do with all those cells anyway?")
                    } else {
                        changeGridSize(newDimension);
                    }
                }
                break;
            default:
                break;
        }
    })
})

function changeGridSize(newDimension) {
    const oldCellClassList = cells[0].classList; //Save any old state if there is any (like grid lines).

    //I prefer to update 'cells' array and then update the grid using the nodes of this
    //array for consistency.
    cells.forEach((c) => {
        grid.removeChild(c);
    });
    cells = [];
    let newCell = document.createElement("div");
    newCell.classList = oldCellClassList;
    newCell.style.width = `calc(100%*(1/${newDimension}))`;
    for (let i = 0; i < newDimension * newDimension; i++) {
        cells.push(newCell.cloneNode(false));
    }
    cells.forEach((c) => {
        grid.appendChild(c);
    })
}