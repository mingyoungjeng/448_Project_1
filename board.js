

document.addEventListener('DOMContentLoaded', function () {

    var dim = 400;
    var rows = 10;
    var cols = 10;

    class Gameboard {
        constructor(rows, cols) {
            this.rows = rows;
            this.cols = cols;
        }

        makeBoard() {
            for (var i = 0; i < this.rows; i++) {
                for (var j = 0; j < this.cols; j++) {
                    const div = document.createElement('div');
                    div.className = `${i}${j}`;
                    div.style.position = "fixed";
                    div.style.top = `${i * 40}px`;
                    div.style.left = `${j * 40}px`;

                    const color = Math.floor(Math.random() * 255);
                    const colorString = '#' + color.toString(16) + color.toString(16) + color.toString(16);
                    //const colorString = "#" + color.toString(16).padStart(3, '0');
                    div.style.backgroundColor = colorString;
                    div.style.width = '40px';
                    div.style.height = '40px';

                    //set hover action

                    
                    document.body.appendChild(div);
                }
            }
        }
    }


    const board = new Gameboard(10, 10);
    board.makeBoard();

});