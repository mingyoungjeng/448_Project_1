
/**
Board.js was created to help with the implementation of the board. Being able to register the different
cells. Which helps with keeping track of hits and misses of the ships, hiding the ships, showing
the boards, and hidinging the board when players take turns.
*/

/**
 * Creates the board
 * @Parem 	id
 * @return 	none
 */
class Board {
	/**
	 * 
	 * @param {string} id str - identifies cell uniquely 
	 */
	constructor(id) {
		this.cells = []; // this may be useful later when iterating.
		this.ships = [];
		this.table = document.createElement("table");
		this.table.class = "game_board";
		this.table.id = id ? id : "Board";

		let rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
		let cols = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

		for (var i = 0; i < rows.length; i++) {
			var row = this.table.insertRow(i);
			row.id = rows[i];
			this.cells.push([]);
			for (var j = 0; j < cols.length; j++) {
				var cell = row.insertCell(j);
				cell.location = cols[j] + rows[i]; // generic name
				cell.id = this.table.id + "_" + cols[j] + rows[i]; // unique name
				cell.setAttribute('row', rows[i]);
				cell.setAttribute('col', cols[j]);
				cell.classList.add('empty');
				this.cells[i].push(cell);
			}
		}
		console.log(this.cells)
		this.hideBoard();
		document.body.appendChild(this.table)
	}
	/**
	 * Gets cell id for position
	 * @param {string} id str - identifies cell uniquely
	 * @return 	null if empty or returns the cell
	 */
	getCell(id) {
		for (var i = 0; i < this.cells.length; i++) {
			for (var j = 0; j < this.cells[i].length; j++) {
				if (this.cells[i][j].location == id) {
					return this.cells[i][j];
				}
			}
		}
		console.log("Board " + this.table.id + " does not have cell " + id + "!");
		return null;
	}


	/**
	 * @param {string} id identifies each cell uniquely 
	 * @param {string} state State gets added conditionally to classList
	 * @return none
	 */
	drawCell(id, state) {
		let cell = this.getCell(id);
		console.log("drawCell: classList = " + cell.classList);
		//If you place a ship, the classList contains 'miss' before it is supposed to be added?
		//Maybe due to when the eventListener is added?
		if (this.isEmpty(id)) {
			if (state == "hit") {
				cell.classList.add("hit");
				playAttackSound('music/hit.mp3');
			} else if (state == "miss") {
				cell.classList.add("miss");
				playAttackSound('music/miss.mp3');
			}
            cell.classList.remove('empty');
		}
	}
	/**
	 * Checks to see if cell is empty
	 * @param {string} id unique identifier
	 * @return {Boolean} return true if ship has 'hit' or 'miss' in class list
	 */
	isEmpty(id) {
		var cell = this.getCell(id);
		return !(cell.classList.contains("hit") || cell.classList.contains("miss"))
	}

	/**
	 *Shows ships location
	 * @Parem none
	 * @return none
	 */	
	showShips() {
		for (var ship of this.ships) {
			for (var id of Object.keys(ship.locations)) {
				let cell = this.getCell(id);

				cell.classList.remove("empty");
				cell.classList.add("ship")
			}
		}
	}
	/**
	*Hides ships location
	 * @Parem 	none
	 * @return 	none
	 */
	hideShips() {
		for (var ship of this.ships) {
			for (var id of Object.keys(ship.locations)) {
				let cell = this.getCell(id);

				cell.classList.remove("ship");
				cell.classList.add("empty")
			}
		}
	}
	/**
	 *Shows the board.
	 * @Parem 	none
	 * @return 	none
	 */
	showBoard() {
		this.table.style.display = "block";
	}

	/**
	 * Hides board
	 * @Parem none
	 * @return none
	 */
	hideBoard() {
		this.table.style.display = "none";
	}

	/**
	 * Removes table
	 * @Parem none
	 * @return none
	 */
	remove() {
		this.table.remove();
	}

}
