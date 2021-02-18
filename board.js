

document.addEventListener('DOMContentLoaded', function () {

    var dim = 600;
    var rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    var cols = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
    var w = Math.floor(dim / rows.length);

    class Gameboard {
        constructor(rows, cols) {
            this.rows = rows;
            this.cols = cols;
        }

        makeBoard() {
            for (var i = 0; i < this.rows; i++) {
                for (var j = 0; j < this.cols; j++) {
                    const div = document.createElement('div');
                    div.id = `${rows[i]}${cols[j]}`;
                    div.className = Math.random() < 0.2 ? 'boat' : 'water';
                    div.style.position = "absolute";
                    div.style.top = `${i * w}px`;
                    div.style.left = `${j * w}px`;

                    div.style.width = `${w}px`;
                    div.style.height = `${w}px`;

                    div.addEventListener("click", this.attack);

                    document.body.appendChild(div);
                }
            }
        }

        attack(e) {
            const myClass = e.target.className;
            if (myClass === 'boat') {
                e.target.innerHTML = "X";
            }
            else if (myClass === 'water') {
                e.target.innerHTML = "O";

            }
        }

    }


    const board = new Gameboard(10, 10);
    board.makeBoard();

});