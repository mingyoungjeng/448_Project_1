
function make2DArray(cols, rows) {
    var arr = new Array(cols);
    for (var i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }
    return grid
}

var grid;
var cols = 10;
var rows = 10;
var w;
var gridSize = 400;

function makeBoard() {
    var canvas = document.getElementById("gameboard");
    var ctx = canvas.getContext('2d');
    //ctx.rect(0, 0, gridSize, gridSize)



    w = gridSize / cols
    grid = make2DArray(rows, cols) 

    //create tiles
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j] = new tile(i * w, j * w, w)
        }
    }
}

function draw() {
    //display tiles
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j].show()
        }
    }
}

makeBoard()

