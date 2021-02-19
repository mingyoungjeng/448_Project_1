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

		const rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
		const cols = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

		for (var i = 0; i < rows.length; i++) {
			var row = this.table.insertRow(i);
			row.id = rows[i];
			this.cells.push([]);
			for (var j = 0; j < cols.length; j++) {
				var cell = row.insertCell(j);
				cell.id = cols[j] + rows[i];
				cell.classList.add('empty');
				cell.setAttribute('row', rows[i]);
				cell.setAttribute('col', cols[j]);
				/*
				cell.addEventListener('click', function() {
					alert(cell.getAttribute('row') + " " + cell.getAttribute('col'));
				});
				*/
				this.cells[i].push(cell);

			}
		}
		document.body.appendChild(this.table)
		console.log("made board");
	}

	getCell(id) {
		return document.getElementById(this.table.id + "_" + id);
	}
}

var board = new Board('gameboard');