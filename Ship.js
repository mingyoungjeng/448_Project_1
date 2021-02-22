/**
 * class representing a ship
 */
class Ship {
	/**
	 * Creates a ship object
	 * @param {Array} locations List of strings representing coordinates ex. "A3"
	 */
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

	/**
	 * Determines whether a ship has been sunk.
	 * @returns {Boolean} true if the ship has 0 health.
	 */
	isSunk() {
		return this.health == 0 ? true : false;
	}

	/**
	 * 
	 * @param {HTMLTableCellElement} cell a table entry.
	 */
	hit(cell) {
		if (this.locations[cell]) {
			this.locations[cell] = false;
			this.health--;
			return true;
		}
		return false;
	}

}
