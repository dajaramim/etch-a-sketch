// Variables
const grid = document.querySelector('#grid');
const body = document.querySelector('body');
const heading = document.querySelector('#heading');
const labelChooseColor = document.querySelector('label[for="color-picker"]');
const interfaceButtons = document.querySelectorAll('.interface-button');
const colorPicker = document.querySelector('#color-picker');
const eraseBtn = document.querySelector('#erase-btn');
const clearBtn = document.querySelector('#clear-btn');
const randomBtn = document.querySelector('#random-btn');
const rowsNumber = document.querySelector('#rows-number');
const columnsNumber = document.querySelector('#columns-number');
const newGrid = document.querySelector('#new-grid');

const defaultColor = '#000000'
const widthGrid = 600
const heightGrid = 600
let isRandomMode = false;
let previewColor;
colorPicker.value = defaultColor;
rowsNumber.value = 16
columnsNumber.value = 16
let gridChildren;
let colorSelected = colorPicker.value;
let isMouseDown = false
let isSquarePainted = false

showGrid(16, 16)

//Events
eventListener()
function eventListener() {
    colorPicker.addEventListener('change', changeColorSelected)
    body.addEventListener('mousedown', () => {
        isMouseDown = true;
    })
    body.addEventListener('mouseup', () => {
        isMouseDown = false;
    })
    body.addEventListener('mousemove', changeColor);
    body.addEventListener('mousedown', changeColor);
    body.addEventListener('mouseout', (e) => {
        if (e.target.classList.contains('square')) {
            isSquarePainted = false;
        }
    });
    body.addEventListener('mousemove', (e) => {
        previewColor = e.target.style.backgroundColor
    });
    body.addEventListener('click', makeSquareDarker);


    randomBtn.addEventListener('click', randomMode);

    eraseBtn.addEventListener('click', eraseSquare);

    clearBtn.addEventListener('click', clearSquares);
    newGrid.addEventListener('click', () => {
        clearGrid()
        showGrid(rowsNumber.value, columnsNumber.value);
    });
}

// Functions
function showGrid(rows, columns) {
    for (let i = 0; i < rows; i++) {
        const newRow = document.createElement('div');
        for (let j = 0; j < columns; j++) {
            const square = document.createElement('div');
            widthSquare = widthGrid / rows;
            heightSquare = heightGrid / columns;
            square.classList.add('square');
            square.style.height = `${heightSquare}px`;
            square.style.width = `${widthSquare}px`;

            newRow.appendChild(square)
        }
        grid.appendChild(newRow)
    }
    gridChildren = Array.from(grid.childNodes);
}

function changeColor(e) {


    if (!e.target.classList.contains('square')) return

    if (isRandomMode) {
        colorSelected = getRandomColor()
    }
    if (isMouseDown && !isSquarePainted) {
        e.target.style.backgroundColor = colorSelected;
        colorPicker.value = colorSelected
        isSquarePainted = true
    }

}

function makeSquareDarker(e) {
    if (!e.target.classList.contains('square')) return

    squareStyle = getComputedStyle(e.target);
    brightnessProperty = squareStyle.getPropertyValue('filter');
    brightnessPercent = parseFloat(brightnessProperty.slice(11, 14));

    if (colorSelected === '#ffffff' || brightnessProperty === 'none' || hexToRgb(colorSelected) !== previewColor) {
        e.target.style.filter = `brightness(1)`
    }
    else if (!isRandomMode && brightnessPercent > 0.0) {
        e.target.style.filter = `brightness(${brightnessPercent - 0.1})`;
    } else {
        e.target.style.filter = ``
    }
}

function changeColorSelected() {
    colorSelected = colorPicker.value;
}

function eraseSquare() {
    isRandomMode = false
    colorPicker.value = '#ffffff';
    changeColorSelected();
    normalMode()
}

function clearSquares() {
    gridChildren.forEach(rows => {
        const columns = Array.from(rows.childNodes);
        columns.forEach(square => {
            if (square.classList.contains('square')) {
                square.style.backgroundColor = '#ffffff';
                square.style.filter = ``;
            }
        });
    });

}

function clearGrid() {
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }
}

function randomMode() {
    isRandomMode = !isRandomMode;
    if (isRandomMode) {
        body.classList.add('random-body');
        heading.classList.add('random-heading');
        labelChooseColor.classList.add('random-label');
        const buttons = Array.from(interfaceButtons);
        buttons.forEach(btn => {
            btn.classList.add('random-btn');
        });
        buttons[0].textContent = 'Normal Mode';
        labelChooseColor.textContent = 'Current Color';
    }
    else {
        normalMode()
        changeColorSelected();
    }
}

function normalMode() {
    body.classList.remove('random-body');
    heading.classList.remove('random-heading');
    labelChooseColor.classList.remove('random-label');
    const buttons = Array.from(interfaceButtons);
    buttons.forEach(btn => {
        btn.classList.remove('random-btn');
    });
    buttons[0].textContent = 'Random Mode';
    labelChooseColor.textContent = 'Choose a Color';
}

function getRandomColor() {
    let blue = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let red = Math.floor(Math.random() * 256);

    const randomColor = rgbToHex(red, green, blue);
    return randomColor;
}
function componentToHex(color) {
    const hex = color.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(red, green, blue) {
    const hexRed = componentToHex(red);
    const hexGreen = componentToHex(green);
    const hexBlue = componentToHex(blue);
    return "#" + hexRed + hexGreen + hexBlue;
}

function hexToRgb(hex) {
    hex = hex.replace(/^#/, '');

    var bigint = parseInt(hex, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;

    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}


