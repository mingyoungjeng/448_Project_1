class Board {
	constructor(id) {
		this.cells = []; // this may be useful later when iterating.
		this.table = document.createElement("table");
		this.table.class = "game_board";

		if (id) {
			this.table.id = id;
		} else {
			throw "error: ID is required for Board class!";
		}

		let rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
		let cols = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

		for (var i = 0; i < rows.length; i++) {
			var row = this.table.insertRow(i);
			row.id = rows[i];
			this.cells.push([]);
			for (var j = 0; j < cols.length; j++) {
				var cell = row.insertCell(j);
				cell.id = id + "_" + cols[j] + rows[i];

				this.cells[i].push(cell);
			}
		}
		document.body.appendChild(this.table)
	}

	getCell(id) {
		return document.getElementById(this.table.id + "_" + id);
	}
}