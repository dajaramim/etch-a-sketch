const grid = document.querySelector('#grid');
const body = document.querySelector('body')
const colorPicker = document.querySelector('#color-picker')
const eraseBtn = document.querySelector('#erase-btn')
const clearBtn = document.querySelector('#clear-btn')
const randomBtn = document.querySelector('#random-btn')
const defaultColor = '#000000'
let isRandomMode = false;

colorPicker.value = defaultColor
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
        isSquarePainted = true
    }
}

function changeColorSelected() {
    colorSelected = colorPicker.value;
}

function eraseSquare() {
    colorPicker.value = '#ffffff';
    changeColorSelected();
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
    if (!isRandomMode) changeColorSelected();
}

function getRandomColor() {
    let blue = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let red = Math.floor(Math.random() * 256);

    const randomColor = `rgb(${red}, ${green}, ${blue})`
    return randomColor;
}