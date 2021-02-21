class Ship {
	constructor(locations = []) {
		// An object that stores locations with values true/false.
		//True = not hit
		this.locations = {};
		for (var loc of locations) {
			this.locations[loc] = true;
		}
		this.size = locations.length;
		this.health = this.size; //decrement on hit

		this.rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
		this.cols = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
	}

	isSunk() {
		return this.health == 0 ? true : false;
	}

	hit(cell) {
		console.log(
			"evaluating 'hit(cell)' = " + this.locations[cell] + "\n"
			+ "cell = " + cell
			);
		if (this.locations[cell]) {
			this.locations[cell] = false;
			this.health--;
			return true;
		}
		return false;
	}

	draw() {

	}

	place(player = null) {
		// console.log(Object.keys(this.locations));
		// for (var key of Object.keys(this.locations)) {
		// 	//console.log(key);
		// 	//document.querySelector('[id*=' + key + ']').setAttribute('hasShip', true);
		// }
        //
		// if (!player) {
		// 	console.log(
		// 		'boards = ' + document.querySelector('board')
		// 	)
		// }

	}

}
