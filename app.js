const grid = document.querySelector('#grid');
const body = document.querySelector('body')
const colorPicker = document.querySelector('#color-picker')
const eraseBtn = document.querySelector('#erase-btn')
const clearBtn = document.querySelector('#clear-btn')
colorPicker.value = '#000000'
let gridChildren;
let colorSelected = colorPicker.value;
let isMouseDown = false

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
    body.addEventListener('click', changeColor);

    eraseBtn.addEventListener('click', eraseSquare)

    clearBtn.addEventListener('click', clearSquares)


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
    if(!e.target.classList.contains('square')) return
    if (isMouseDown || (!isMouseDown && e.type === 'click')) {
        e.target.style.backgroundColor = colorSelected;
    }
}
function changeColorSelected() {
    colorSelected = colorPicker.value
}
function eraseSquare() {
    colorPicker.value = '#ffffff'
    changeColorSelected()
}
function clearSquares() {
    gridChildren.forEach(rows => {
        const columns = Array.from(rows.childNodes)
        columns.forEach(square => {
            if (square.classList.contains('square')) {
                square.style.backgroundColor = '#ffffff'
            }
        });
    });

}