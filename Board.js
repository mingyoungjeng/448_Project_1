class Board {
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
		document.body.appendChild(this.table)
	}

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

	// Draws hit/miss indicator on cell
	drawCell(id, state) {
		var cell = this.getCell(id);
		cell.classList.remove("empty");

		if (state == "hit") {
			cell.classList.add("hit");
			return true;
		} else if (state == "miss") {
			cell.classList.add("miss");
			return true;
		} else {
			cell.classList.empty("miss");
			return false;
		}
	}

	showShips() {

	}

	hideShips() {

	}

	showBoard() {
		this.table.style = "block";
	}

	hideBoard() {
		this.table.style = "none";
	}

	remove() {
		this.table.remove();
	}
}