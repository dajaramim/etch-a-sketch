const grid = document.querySelector('#grid');
showGrid()

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

}
