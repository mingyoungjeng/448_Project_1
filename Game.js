// Game.js
// Controls the logic of the game.

class Game {
	constructor() {
		// Available players (can potentially be expanded)
		this.players = ["player1", "player2"];
		this.boards = {}; // needs to be an dict to have key/value pairs
		this.numShips = 0; // This needs to go away

		for (var player of this.players) {
			this.boards[player] = {}; // Needs to hold Board object
		}

		this.showTitleScreen();
	}

	showTitleScreen() {

	}

	// Sets up a new game
	setup() {
		// Creates two game boards on screen
		this.boards["player1"] = new Board("player1");
		this.boards["player2"] = new Board("player2");
		this.button = document.getElementById("button");

		let game = this;
		button.onclick = function() {game.buttonClicked()}; // this isn't necessary

		// The following must be done for Player 1 AND Player 2
		for (var player of this.players) {

			// Adds eventListener for each cell onClick
			// If you can manage to do this in Board class, I will love you.
			for (var row of this.boards[player].cells) {
				for (var cell of row) {
					cell.onclick = function() {game.cellClicked(this)};
				}
			}
			
			this.placeShips(player);
		}

		// Start game
			// Clear screen
		//this.play();
		this.turn("player1")
	}

	play() {
		var i = Math.round(Math.random()); // Generates either 0 or 1, random player starts first
		var win = true;
		while (!win) {
			i = (i+1)%2;
			win = this.turn(this.players[i]);
		}
		this.game_over(this.players[i]);
	}

	// Runs a game while playing
	// GENIUS IDEA: make hit/miss indicators static and only hide/reveal the ships
	// Shows activePlayer their ship's status and their shoot history
	turn(activePlayer) {
		// Alternates turns between players.

		// Defines inactivePlayer for use later
		let inactivePlayer = activePlayer == "player1" ? "player2" : "player1";
		
		this.boards[activePlayer].showShips();
		this.buttonClicked = function() {};

		let game = this;
		this.cellClicked = function(cell) {
			var board = cell.parentElement.parentElement.parentElement.id;
			if (board == inactivePlayer && cell.classList.contains("empty")) {

				// Check for game over
				var win = true;
				for (var ship of this.boards[inactivePlayer].ships) {
					if (ship.hit(cell.location)) {
						game.boards[inactivePlayer].drawCell(cell.location, "hit");
					} else {
						game.boards[inactivePlayer].drawCell(cell.location, "miss");
					}

					if (!ship.isSunk()) {
						win = false;
					}
				}

				// Game over stuff
				if (win) {
					this.game_over(activePlayer);
					return;
				} else {
					this.endTurn(inactivePlayer);
				}
			}
		}
	}

	// Triggered when one player wins
	game_over(winner) {
		console.log(winner + " wins!");
		for (var board of Object.values(this.boards)) {
			board.remove();
			this.boards = {};
		}


		// Display victory text
		// Play again or go back to title screen
	}

	endTurn(newPlayer) {
		this.cellClicked = function() {};
		for (var board of Object.values(this.boards)) {
			board.hideShips();
		}

		let game = this;
		this.buttonClicked = function() {game.turn(newPlayer)};
	}

	placeShips(player) {
		// Prompt player for number of ships to place
		if (!(this.numShips > 0  && this.numShips < 7)) { //replace with a try throw catch?
			var numShips = prompt("# of ships (1 - 6): ");
			this.numShips = numShips;
			console.log('num ships = ' + this.numShips);
		}

		if (this.numShips < 6) {
			console.log('removing buttons from other blah');
			for (var j = Number(this.numShips) + 1; j < 7; j++) {
				console.log(j);
				//console.log('doing stuff');
				//console.log('#button_' + player + "_" + j);
				document.querySelector('#button_' + player + "_" + j).disabled = true;
			}
		}


		let game = this;
		this.cellClicked = function(cell) {
			//this one is gonna be complicated
		}
		

		// Creating test set of ships
		//this.ships[player].push(new Ship(["A1", "B1", "C1"]));
		//4console.log(this.ships);
	}
	
	// This function gets called everytime a cell is clicked.
	// Can be altered
	cellClicked(cell) {

	}

	buttonClicked() {

	}
	
}
