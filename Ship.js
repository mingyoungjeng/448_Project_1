class Ship {
    constructor(size, name) {
        this.size = size;
        this.life = size;
        this.name = name;
    }


}

class Ship {
	constructor(locations) {
		this.size = locations.length
		this.locations = [];
		this.sunk = [];
		this.name;

		for (var i = 0; i < this.size; i++) {
			this.sunk.push(false);
			this.locations.push(locations[i].class);
		}
	}

	isSunk() {
		for (var i = 0; i < this.size.length; i++) {
			if (size[i] != 0) {
				return false;
			}
		}
		return true;
	}

	hit(cell) {
		for (var i = 0; i < this.locations.length; i++) {
			if (cell == this.locations[i]) {
				this.sunk[i] = true;
				return true;
			}
		}
		return false;
	}

}