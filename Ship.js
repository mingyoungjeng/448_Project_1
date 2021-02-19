class Ship {
	constructor(locations = []) {
		this.locations = {}; // An object that stores locations with values true/false. True = not hit
		this.size = locations.length;
		this.health = this.size; //decrement on hit

		for (var cell of locations) {
			this.locations[cell] = true;
		}
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

}