// Game.js
// Controls the logic of the game.

class Game {
	constructor() {
		// Available players (can potentially be expanded)
		this.players = ["player1", "player2"];
		this.boards = {}; // needs to be an dict to have key/value pairs

		for (var player of this.players) {
			this.boards[player] = {}; // Needs to hold Board object
		}

		let game = this;
		this.button = document.getElementById("button");
		button.onclick = function() {game.buttonClicked()}; // this isn't necessary

		this.showTitleScreen();
	}

	showTitleScreen() {
		var title = document.createElement("div");
		//title.innerHTML = "Look at me, I'm a title!";
		document.body.appendChild(title);

		button.innerHTML = "START";
		this.buttonClicked = function() {
			title.remove();
			this.setup();
		}
	}

	// Sets up a new game
	setup() {
		// Creates two game boards on screen
		this.boards["player1"] = new Board("player1");
		this.boards["player2"] = new Board("player2");

		let game = this;

        //console.log('is shipCnt = ' + document.querySelector(''))

        if (!document.querySelector('#shipCnt')) {
    		var shipCnt = document.createElement("input");
    		shipCnt.type = "number";
    		shipCnt.id = "shipCnt";
    		shipCnt.name = "shipCnt";
    		shipCnt.min = "1";
    		shipCnt.max = "6";

    		var label = document.createElement("label");
    		label.for = "shipCnt";
    		label.innerHTML = "Select number of ships: ";

    		document.getElementById("setup").appendChild(label);
    		document.getElementById("setup").appendChild(shipCnt);

    		for (var i = shipCnt.min; i <= shipCnt.max; i++) {
    			let btn = document.createElement("button");
    			btn.classList.add("setupButton");
    			btn.id = "button_" + i;
    			btn.innerHTML = i + " unit";
    			btn.disabled = true;

    			document.getElementById("setup").appendChild(btn);
    		}
        }

		// The following must be done for Player 1 AND Player 2
		for (var player of this.players) {

			// Adds eventListener for each cell onClick
			// If you can manage to do this in Board class, I will love you.
			for (var row of this.boards[player].cells) {
				for (var cell of row) {
					cell.onclick = function() {game.cellClicked(this)};
				}
			}
		}
        /*
		var myBtn = document.querySelector('#change');
		console.log(myBtn);

		myBtn.innerHTML = "End Player 1 Setup";
		this.placeShips('player1');
		myBtn.onclick = function () {
			document.game.boards['player1'].hideShips();
			console.log('entering player 2 setup');
			myBtn.innerHTML = "End Player 2 Setup";
			document.game.placeShips('player2');
			myBtn.onclick = function () {
				document.game.boards['player2'].hideShips();
				myBtn.disabled = true;
				myBtn.innerHTML = "Click Play Game to Start";
				//integrate myBtn into the play game btn?
			}
		}
        */

		this.placeShips("player1");
	}

	// Runs a game while playing
	play(activePlayer) {
		//console.log("It is " + activePlayer + "'s turn");

		// Defines inactivePlayer for use later
		let inactivePlayer = activePlayer == "player1" ? "player2" : "player1";

		this.boards[inactivePlayer].hideShips();
		this.changeInstruction(activePlayer);
		this.button.innerHTML = "pogger";
		this.buttonClicked = function() {};


		let game = this;
		this.cellClicked = function(cell) {
			var board = cell.parentElement.parentElement.parentElement.id;
			if (board == inactivePlayer && this.boards[inactivePlayer].isEmpty(cell.location)) {

				// Check for game over
				var win = false;

                // determine if the cell location has a ship underneath
                if (this.boards[inactivePlayer].ships.some(ship => {
                    return ship.hit(cell.location);
                })) {
                    // if so, draw the hit
                    game.boards[inactivePlayer].drawCell(cell.location, "hit");
                } else {
                    // otherwise don't
                    game.boards[inactivePlayer].drawCell(cell.location, "miss");
                }

                //determine whether every ship has been sunk. if so, win = true
                if (this.boards[inactivePlayer].ships.every(ship => {
                    return ship.isSunk();
                })) {
                    win = true;
                }

				// Game over stuff
				if (win) {
					game.game_over(activePlayer);
					game.instDone();
				} else { // End turn
					game.cellClicked = function() {};
					game.button.innerHTML = "End turn";
					game.buttonClicked = function() {
						game.boards[inactivePlayer].showShips();
						game.play(inactivePlayer)
					};
				}
			}
		}
	}

	// Triggered when one player wins
	game_over(winner) {
		var title = document.createElement("div");
		title.innerHTML = winner + " wins!";
		document.body.appendChild(title);
        document.game.cellClicked = function() {}   ;

		for (var board of Object.values(this.boards)) {
			board.remove();
			this.boards = {};
		}

        // reset the game boards and eventLisneners
		button.innerHTML = "Play again?";
		this.buttonClicked = function() {
            // reset ship placement interaction
            document.querySelector('#shipCnt').disabled = false;
            document.querySelector('#rotate').disabled = false;
			title.remove();
			this.setup();
		}
	}

	placeShips(player) {
		for (var p of this.players) {
			if (p == player) {
				this.boards[p].showBoard();
			} else {
				this.boards[p].hideBoard();
			}
		}

		let shipCnt = document.getElementById("shipCnt");
		shipCnt.onchange = function() {
			for (var i = shipCnt.min; i <= shipCnt.max; i++) {
				let btn = document.querySelector('#button_' + i);
				btn.disabled = (i > shipCnt.value);

				let size = i; // This is necessary for stupid reasons
				btn.onclick = function() {placeShipHorizontal(size, player)};
			}
		};

		if (player == "player1") {
			this.button.innerHTML = "End Setup";
			this.buttonClicked = function() {
                removeAll();
				shipCnt.value = null;
				shipCnt.onchange();
				this.placeShips("player2");
			}
		} else {
            console.log('starting game');
			// Start game
			let game = this;
			this.button.innerHTML = "Play Game";
			this.buttonClicked = function() {
                removeAll();
                document.querySelector('#rotate').disabled = true;
                [...document.querySelectorAll('[id*=button_]')].forEach(btn => {
                    btn.disabled = true;
                });
                document.querySelector('#shipCnt').disabled = true;
				game.boards["player1"].showBoard();
				this.play(game.players[Math.round(Math.random())]);
			}
		}
	}

	// This function gets called everytime a cell is clicked.
	// Can be altered
	cellClicked(cell) {

	}

	buttonClicked() {

	}

	changeInstruction(activePlayer){
		document.querySelector("#inst").innerText = activePlayer + "'s Turn!";
	}

	dontPress(inactivePlayer){
		document.querySelector("#inst").innerText = "You're turn is over! Hand over the computer and when " + inactivePlayer + " is ready, press End Turn!";
	}

	instDone(){
		document.querySelector("#inst").innerText = "";
	}

}

//reset Button
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#resetbutton").addEventListener("click", () => {
        location.reload();
  })
})
