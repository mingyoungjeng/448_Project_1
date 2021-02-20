class Ship {
	constructor(locations = []) {
		this.locations = locations; // An object that stores locations with values true/false. True = not hit
		this.size = locations.length;
		this.health = this.size; //decrement on hit

		for (var cell of locations) {
			this.locations[cell] = true;
		}
		this.rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
		this.cols = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
	}

	isSunk() {
		return this.health == 0 ? true : false;
	}

	hit(cell) {
		if (this.locations[cell]) {
			this.locations[cell] = false;
			this.health--;
			return true;
		}
		return false;
	}

	draw() {

	}

	place(row, col, num, orientation) {
		if (orientation === "vertical") {
			for (var i = 0; i < num; i++) {
				var temp = this.cols[col + i] + this.rows[row];
				this.locations[i] = `${this.cols[col + i]}${this.rows[row]}`;
				console.log(temp);
				document.querySelector(`td#player1_${this.cols[col + i]}${this.rows[row]}`).setAttribute('hasShip', true);
			}
		}
		else if (orientation === "horizontal") {
			for (var i = 0; i < num; i++) {
				this.locations[i] = `${this.cols[col]}${this.rows[row + i]}`;
				document.querySelector(`td#player1_${this.cols[col]}${this.rows[row + i]}`).setAttribute('hasShip', true);
			}
		}
		
	}

}