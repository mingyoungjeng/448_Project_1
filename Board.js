class Board {
	constructor(id) {
		this.cells = []; // this may be useful later when iterating.
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
				cell.class = cols[j] + rows[i]; // generic name
				cell.id = this.table.id + "_" + cols[j] + rows[i]; // unique name
				//add empty class for each cell
				cell.classList.add('empty');
				this.cells[i].push(cell);
			}
		}
		document.body.appendChild(this.table)
	}

	getCell(id) {
		for (var i = 0; i < this.cells.length; i++) {
			for (var j = 0; j < this.cells[i].length; j++) {
				if (this.cells[i][j].class == id) {
					return this.cells[i][j];
				}
			}
		}
		console.log("Board " + this.table.id + " does not have cell " + id + "!");
		return null;
	}

	// Draws hit/miss indicator on cell
	drawCell(id, state) {
		var cell = getCell(id);

		if (state == "hit") {
			// put hit image in cell
		} else if (state == "miss") {
			// put miss image in cell
		} else {
			// clear image in cell
		}
	}
}
