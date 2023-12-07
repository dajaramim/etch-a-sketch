const grid = document.querySelector('#grid');
const colorPicker = document.querySelector('#color-picker')
const clearBtn = document.querySelector('#clear-btn')
colorPicker.value = '#000000'
let gridChildren;
let colorSelected = colorPicker.value;
let isMouseDown = false

showGrid()

eventListener()
function eventListener() {
    colorPicker.addEventListener('change', () => {
        colorSelected = colorPicker.value
    })
    grid.addEventListener('mousedown', () => {
        isMouseDown = true;
    })
    grid.addEventListener('mouseup', () => {
        isMouseDown = false;
    })
    grid.addEventListener('mouseleave', () => {
        isMouseDown = false;
    })
    grid.addEventListener('mousemove', changeColor);
    grid.addEventListener('click', changeColor);


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