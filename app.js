const grid = document.querySelector('#grid');
const body = document.querySelector('body');
const heading = document.querySelector('#heading');
const labelChooseColor = document.querySelector('label[for="color-picker"]');
const interfaceButtons = document.querySelectorAll('.interface-button');
const colorPicker = document.querySelector('#color-picker');
const eraseBtn = document.querySelector('#erase-btn');
const clearBtn = document.querySelector('#clear-btn');
const randomBtn = document.querySelector('#random-btn');
const defaultColor = '#000000'
let isRandomMode = false;

colorPicker.value = defaultColor;
let gridChildren;
let colorSelected = colorPicker.value;
let isMouseDown = false
let isSquarePainted = false

showGrid()

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

    body.addEventListener('mouseout', (e) => {
        if (e.target.classList.contains('square')) {
            isSquarePainted = false;
        }
    });
    body.addEventListener('mousedown', changeColor);

    randomBtn.addEventListener('click', randomMode);

    eraseBtn.addEventListener('click', eraseSquare);

    clearBtn.addEventListener('click', clearSquares);
}

function showGrid() {
    for (let i = 0; i < 16; i++) {
        const row = document.createElement('div');
        for (let j = 0; j < 16; j++) {
            const square = document.createElement('div');
            square.classList.add('square')
            row.appendChild(square)
        }
        grid.appendChild(row)
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
            }
        });
    });

}
function randomMode() {
    isRandomMode = !isRandomMode;
    if (isRandomMode) {
        body.classList.add('random-body');
        heading.classList.add('random-heading');
        labelChooseColor.classList.add('random-label');
        const buttons = Array.from(interfaceButtons);
        buttons.forEach(btn => {
            btn.classList.add('random-btn')
        });
        buttons[0].textContent = 'Normal Mode'
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
        btn.classList.remove('random-btn')
    });
    buttons[0].textContent = 'Random Mode'
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