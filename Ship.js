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
		if (this.locations[cell]) {
			this.locations[cell] = false;
			this.health--;
			return true;
		}
		return false;
	}

}
