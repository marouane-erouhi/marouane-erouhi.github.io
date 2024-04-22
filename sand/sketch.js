// Create a 2D array
// Sorry if you are used to matrix math!
// How would you do this with a
// higher order function????

function withinCols(i) {// Check if a row is within the bounds
    return i >= 0 && i <= cols - 1;
}
function withinRows(j) {// Check if a column is within the bounds
    return j >= 0 && j <= rows - 1;
}
function make2DArray(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
        // Fill the array with 0s
        for (let j = 0; j < arr[i].length; j++) {
            arr[i][j] = 0;
        }
    }
    return arr;
}
class Button {
    constructor(x, y, w, h, defaultColor, hoverColor, text, callback) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.defaultColor = defaultColor
        this.hoverColor = hoverColor
        this.currentColor = defaultColor
        this.text = text
        this.callback = callback
    }

    draw() {
        this.hover()
        fill(this.currentColor)
        rect(this.x - (this.w / 2), this.y - (this.h / 2), this.w, this.h)
        // text
        fill(0) // Set the text color to black
        textAlign(CENTER, CENTER) // Center the text
        text(this.text, this.x, this.y) // Draw the text
    }

    hovered(){
        return (mouseX > this.x - (this.w / 2) && mouseX < this.x + (this.w / 2) && mouseY > this.y - (this.h / 2) && mouseY < this.y + (this.h / 2))
    }

    hover(){
        if (this.hovered()) {
            this.currentColor = this.hoverColor
        } else {
            this.currentColor = this.defaultColor
        }
    }

    click(){
        if(!this.hovered()) return
        
        this.callback()
    }

}
const TetraminoFunctions = {
    scale: function (arr, factor) {
        let result = [];
        for (let i = 0; i < arr.length; i++) {
            let row = [];
            for (let j = 0; j < arr[i].length; j++) {
                for (let k = 0; k < factor; k++) {
                    row.push(arr[i][j]);
                }
            }
            for (let k = 0; k < factor; k++) {
                result.push(row);
            }
        }
        return result;
    },
    rotate: function (arr, direction) {
        let result = [];
        if (direction === 'clockwise') {
            for (let i = 0; i < arr[0].length; i++) {
                let row = [];
                for (let j = arr.length - 1; j >= 0; j--) {
                    row.push(arr[j][i]);
                }
                result.push(row);
            }
        } else if (direction === 'counter-clockwise') {
            for (let i = 0; i < arr[0].length; i++) {
                let row = [];
                for (let j = 0; j < arr.length; j++) {
                    row.push(arr[j][i]);
                }
                result.push(row);
            }
        }
        return result;
    }
}

class Tertramino{
    constructor(shape, scale){
        this.shape = shape
        this.scale = scale
        
        this.tetramino = TetraminoFunctions.scale(shape,scale)
    }
    insert(x,y){
        this.tetramino = TetraminoFunctions.rotate(this.tetramino, 'clockwise')
        for (let i = 0; i < this.tetramino.length; i++) {
            for (let j = 0; j < this.tetramino[0].length; j++) {
                let col = x + i;
                let row = y + j;
                if (withinCols(col) && withinRows(row)) {
                    if (this.tetramino[i][j] === 0) continue
                    grid[col][row] = gameData.currentColor;
                }
            }
        }
    }
}
// The grid
let grid;
// How big is each square?
let w = 1;
let cols, rows;

// const gameColors = ['rgb(255, 0, 0)', 'rgb(0,255, 0)', 'rgb(0,0,255)']
// const gameColors = [75, 150, 300]
// const gameColors = ['red', 'red', 'red']
const tetrisShapes = {
    l: [[1, 0], [1, 0], [1, 1]],
    square: [[1,1],[1,1]],
    t: [[1,1,1],[0,1,0]],
    skew: [[0,1,1],[1,1,0]],
    straight: [[1,1,1,1], [0,0,0,0]]
}

let gameState = 'game' // menu, game
let menuData = {
    playButton: null
}
let gameData = {
    pieces: [],
    currentColor: 0
}
function drawMenu(){
    menuData.playButton.draw()
}

function isIslandTouchingSides(grid, x, y, color) {
    let visited = make2DArray(cols, rows);
    let queue = [];

    if (grid[x][y] !== color) return false;

    queue.push({ x, y });

    while (queue.length > 0) {
        let { x, y } = queue.shift();

        if (visited[x][y]) continue;
        visited[x][y] = true;

        if (x === 0 || x === cols - 1) return true;

        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                let nx = x + dx;
                let ny = y + dy;

                if (withinCols(nx) && withinRows(ny) && grid[nx][ny] === color) {
                    queue.push({ x: nx, y: ny });
                }
            }
        }
    }

    return false;
}

function floodFill(grid, x, y, oldColor, newColor) {
    if (x < 0 || x >= cols || y < 0 || y >= rows) return;
    if (grid[x][y] !== oldColor) return;

    grid[x][y] = newColor;

    floodFill(grid, x - 1, y, oldColor, newColor);
    floodFill(grid, x + 1, y, oldColor, newColor);
    floodFill(grid, x, y - 1, oldColor, newColor);
    floodFill(grid, x, y + 1, oldColor, newColor);
}

function drawGame(){
    // Draw the sand
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            noStroke();
            if (grid[i][j] > 0) {
                let cell_color = color(255, 0, 0)
                if (grid[i][j] == 1)       cell_color = color(255,0,0)
                else if (grid[i][j] == 2)  cell_color = color(0,255, 0)
                else if (grid[i][j] == 3)   cell_color = color(0,0,255)
                fill(cell_color);
                // fill(gameColors[grid[i][j] - 1]);
                let x = i * w;
                let y = j * w;
                square(x, y, w);
            }
        }
    }

    // Create a 2D array for the next frame of animation
    let nextGrid = make2DArray(cols, rows);

    // Check every cell
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            // What is the state?
            let state = grid[i][j];

            // If it's a piece of sand!
            if (state > 0) {
                // What is below?
                let below = grid[i][j + 1];

                // Randomly fall left or right
                let dir = 1;
                if (random(1) < 0.5) {
                    dir *= -1;
                }

                // Check below left or right
                let belowA = -1;
                let belowB = -1;
                if (withinCols(i + dir)) {
                    belowA = grid[i + dir][j + 1];
                }
                if (withinCols(i - dir)) {
                    belowB = grid[i - dir][j + 1];
                }


                // Can it fall below or left or right?
                if (below === 0) {
                    nextGrid[i][j + 1] = state;
                } else if (belowA === 0) {
                    nextGrid[i + dir][j + 1] = state;
                } else if (belowB === 0) {
                    nextGrid[i - dir][j + 1] = state;
                    // Stay put!
                } else {
                    nextGrid[i][j] = state;
                }
            }
        }
    }
    // for (let i = 0; i < cols; i++) {
    //     for (let j = 0; j < rows; j++) {
    //         if (grid[i][j] > 0 && isIslandTouchingSides(grid, i, j, grid[i][j])) {
    //             floodFill(grid, i, j, grid[i][j], 0);
    //         }
    //     }
    // }

    grid = nextGrid;
}

function mousePressed() {
    if(gameState !== 'game')    return
    let mouseCol = floor(mouseX / w);
    let mouseRow = floor(mouseY / w);

    // tetrisShapes.t = enlargeArray(tetrisShapes.t,10)
    // gameData.tetraminoT.setColor(gameData.currentColor)
    // gameData.tetraminoT.insert(mouseCol, mouseRow)
    const random_piece = random(gameData.pieces)
    random_piece.insert(mouseCol, mouseRow)
    gameData.currentColor = ceil(random(3))
}
function mouseReleased(){
    if(gameState === 'menu'){
        menuData.playButton.click()
    }
}

function setup() {
    createCanvas(400, 600);
    // colorMode(HSB, 360, 255, 255);
    cols = width / w;
    rows = height / w;
    grid = make2DArray(cols, rows);
    // frameRate(1)
    menuData.playButton = new Button(width / 2, (height / 2), 100, 65, color(150, 55, 100), color(50, 55, 100), "Start Game", () => { gameState = 'game' })
    gameData.tetraminoT = new Tertramino(tetrisShapes.t,10,'blue')

    gameData.pieces.push(new Tertramino(tetrisShapes.t, 10, 'blue'))
    gameData.pieces.push(new Tertramino(tetrisShapes.l, 10, 'blue'))
    gameData.pieces.push(new Tertramino(tetrisShapes.skew, 10, 'blue'))
    gameData.pieces.push(new Tertramino(tetrisShapes.square, 10, 'blue'))
    gameData.pieces.push(new Tertramino(tetrisShapes.straight, 10, 'blue'))

    const val = random(gameData.pieces)
    console.log(val, gameData.pieces)
    val.insert(cols / 2, 3)
    // gameData.tetraminoT.insert(cols / 2, 3)
    gameData.currentColor = ceil(random(3))
}

function draw() {
    background(0);

    if(gameState === 'menu'){
        drawMenu()
    }else{
        drawGame()
    }

}
