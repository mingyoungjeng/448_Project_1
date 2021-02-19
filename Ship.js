class Ship {
	constructor(locations = []) {
		this.locations = locations;
		this.sunk = [];
		this.size = locations.length;
		this.health = this.size; //decrement on hit

		for (var i = 0; i < this.size; i++) {
			this.sunk.push(false);
			this.locations.push(locations[i].class);
		}
	}

	isSunk() {
		return this.health == 0 ? true : false;
	}

	hit(cell) {
		for (var i = 0; i < this.locations.length; i++) {
			if (cell == this.locations[i]) {
				this.sunk[i] = true;
				health--;
				return true;
			}
		}
		return false;
	}

	draw() {
		
	}

}