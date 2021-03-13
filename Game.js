let shipCount;

/**
 * Class holding the main game object
 */
class Game {
	/**
	 * Defines players and boards. Shows title screen. 
	 */
	constructor() {
		// Available players (can potentially be expanded)
		this.players = ["player1", "player2", "playerAi"];
		this.boards = {}; // needs to be an dict to have key/value pairs
		this.difficulty = "easy"
		this.mode = "pvp"

		for (var player of this.players) {
			this.boards[player] = {}; // Needs to hold Board object
		}

		let game = this;
		this.button = document.getElementById("button");
		button.onclick = function() {game.buttonClicked()}; // this isn't necessary

		this.showTitleScreen();
	}

	/**
	 * Shows title screen and has a start option
	 */
	showTitleScreen() {
		var title = document.createElement("div");
		//title.innerHTML = "Look at me, I'm a title!";
		document.body.appendChild(title);
		var pvai = document.getElementById("pvai")
		var pvp = document.getElementById("pvp")
		let mode

		pvai.onclick = function() {
			console.log("clicked pvai")
			mode = "pvai"
			console.log(mode)
			document.getElementById("easy").disabled = false
			document.getElementById("medium").disabled = false
			document.getElementById("hard").disabled = false
		}

		pvp.onclick = function() {
			console.log("clicked")
			mode = "pvp"
			document.getElementById("easy").disabled = true
			document.getElementById("medium").disabled = true
			document.getElementById("hard").disabled = true
		}

		document.getElementById("easy").onclick = ()=>{this.difficulty = "easy"}
		document.getElementById("medium").onclick = ()=>(this.difficulty = "medium")
		document.getElementById("hard").onclick = ()=>(this.difficulty = "hard")

		//this.setDifficulty()
		button.innerHTML = "Start";
		this.buttonClicked = function() {
			title.remove();
			this.setup(mode);
		}
	}

	setDifficulty()
	{
		var pvai = document.getElementById("pvai")
		var pvp = document.getElementById("pvp")

		pvai.onclick = function() {
			console.log("clicked pvai")
			this.mode = "pvai"
			console.log(this.mode)
			document.getElementById("easy").disabled = false
			document.getElementById("medium").disabled = false
			document.getElementById("hard").disabled = false
		}

		pvp.onclick = function() {
			console.log("clicked")
			this.mode = "pvp"
			document.getElementById("easy").disabled = true
			document.getElementById("medium").disabled = true
			document.getElementById("hard").disabled = true
		}

		document.getElementById("easy").onclick = ()=>{this.difficulty = "easy"}
		document.getElementById("medium").onclick = ()=>(this.difficulty = "medium")
		document.getElementById("hard").onclick = ()=>(this.difficulty = "hard")

	}


	/**
	 * Sets up a new game and creates two boards. One for each player. 
	 * Establishes number of ships and covers placement like rotation of ships
	 */
	setup(mode) {
		// Creates two game boards on screen
		if(true)//this.mode == "pvp")
		{
			this.boards["player1"] = new Board("player1");
			this.boards["player2"] = new Board("player2");
			this.boards["playerAi"] = new Board("playerAi");
		}
		else
		{
			this.boards["player1"] = new Board("player1");
			this.boards["playerAi"] = new Board("playerAi");
		}
		

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
    			btn.innerHTML = "Ship " + i;
    			btn.disabled = true;

    			document.getElementById("setup").appendChild(btn);
    		}

    		var rotate = document.createElement("button");
    		rotate.id = "rotate";
    		rotate.innerHTML = "Rotate Ship";
    		rotate.onclick = function() {
    			window.rotate();
    		}
    		document.getElementById("center").appendChild(rotate);
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
		this.placeShips("player1", mode);
	}

	/**
	 * Executes a turn for the given player
	 * @param {string} activePlayer Player's id
	 */
	play(activePlayer) {
		// Defines inactivePlayer for use later
		let inactivePlayer = activePlayer == "player1" ? "player2" : "player1";

		this.boards[inactivePlayer].hideShips();
		this.changeInstruction(activePlayer);
		this.button.disabled = true;
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
					game.instDone(activePlayer);
				} else { // End turn
					game.cellClicked = function() {};
					game.dontPress(inactivePlayer);
					game.boards[activePlayer].hideShips();
					game.button.disabled = false;
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
		//title.innerHTML = winner + " wins!";
		document.body.appendChild(title);
        this.cellClicked = function() {};
        this.button.disabled = false;

		for (var board of Object.values(this.boards)) {
			board.remove();
			this.boards = {};
		}

        // reset the game boards and eventLisneners
		button.innerHTML = "Play again?";
		this.buttonClicked = function() {
            document.getElementById("resetbutton").style.display = "inline-block";
			title.remove();
			this.setup();
		}
	}

	/**
	 * Places the ships given user input and hides player's ships and board when done
	 * @param {string} player current player
	 */
	placeShips(player, mode, count) {
	
		// for (var p of this.players) {
		// 	if (p == player) {
		// 		this.boards[p].showBoard();
		// 	} else {
		// 		this.boards[p].hideBoard();
		// 	}
		// }
		console.log(mode)
		if(mode == "pvai")
		{
			console.log("MODE: pvai")
			if(player == "player1")
			{
				this.boards[player].showBoard()
				this.boards["playerAi"].hideBoard()
			}
			else
			{
				console.log("else playerAi")
				this.boards[player].showBoard()
				this.boards["player1"].hideBoard()
			}
		}
		else
		{
			if(player == "player1")
			{
				this.boards[player].showBoard()
				this.boards["player2"].hideBoard()
			}
			else
			{
				this.boards[player].showBoard()
				this.boards["player1"].hideBoard()
			}
		}

		if(!(player == "playerAi" && mode == "pvai"))
		{
			let game = this;
			this.button.disabled = true;

			let shipCnt = document.getElementById("shipCnt");
			shipCnt.placed = [];
			shipCnt.placedUpdate = function() {
				game.button.disabled = (shipCnt.placed.length != shipCnt.value);
				shipCnt.disabled = false;
			};

			shipCnt.onchange = function() {
				for (var i = shipCnt.min; i <= shipCnt.max; i++) {
					let btn = document.querySelector('#button_' + i);
					if (!shipCnt.placed.includes(i)) {
						btn.disabled = (i > shipCnt.value);
					}

					let size = i; // This is necessary for stupid reasons
					btn.onclick = function() {
						shipCnt.disabled = true;
						placeShipHorizontal(size, player);
					};

					shipCnt.placedUpdate();
				}

				let board = game.boards[player];
				for (var i in board.ships) {
					if (board.ships[i].size > shipCnt.value) {
						console.log("remove size " + board.ships[i].size);
						board.hideShips();
						shipCnt.placed.splice(shipCnt.placed.indexOf(board.ships[i].size), 1);
						shipCnt.placedUpdate();
						board.ships.splice(i, 1);
						board.showShips();
					}
				}
			};
	}

		//makes Play Game button available
		if(player == "playerAi" && mode == "pvai")
		{
			this.button.disabled = false;
		}

		if (player == "player1" && mode == "pvp") {
			document.querySelector("#inst").innerText = "Place Player 1's Ships Now";
			this.button.innerHTML = "End Setup";
			this.buttonClicked = function() {
                removeAll();
				shipCnt.value = null;
				//shipCnt.onchange();
				document.querySelector("#inst").innerText = "Place Player 2's Ships Now";
				this.placeShips("player2");
			}
		} else if (player == "player1" && mode == "pvai") {
			document.querySelector("#inst").innerText = "Place Player 1's Ships Now";
			this.button.innerHTML = "End Setup";
			this.buttonClicked = function() {
                removeAll();
				shipCount = shipCnt.value//sets global shipCount variable
				shipCnt.value = null;
				//shipCnt.onchange();
				document.querySelector("#inst").innerText = "AI PlACED SHIPS";

				//deltes the setup stuff so like num of ships and ship buttons
				let setup = document.getElementById("setup");
				while (setup.firstChild) {
        			setup.removeChild(setup.firstChild);
    			}
				document.getElementById("rotate").remove();

				//placeAIShips(); //function that will place ships randomly
				this.placeShips("playerAi", mode, count);
			}
		}
		else if(player == "playerAi" && mode == "pvai")
		{
			// Start game
			this.placeAIShips(shipCount); //function that will place ships randomly
			console.log("playerAi and pvai")
			this.button.innerHTML = "Play Game";
			this.buttonClicked = function() {
                // removeAll();

                // let setup = document.getElementById("setup");
				// while (setup.firstChild) {
        		// 	setup.removeChild(setup.firstChild);
    			// }
				// document.getElementById("rotate").remove();

				// document.getElementById("resetbutton").style.display = "none";
				let game = this
				game.boards["player1"].showBoard();
				this.play(game.players[Math.round(Math.random())]);
			}
		}
		else
			{
			// Start game
			this.button.innerHTML = "Play Game";
			this.buttonClicked = function() {
                removeAll();

                let setup = document.getElementById("setup");
				while (setup.firstChild) {
        			setup.removeChild(setup.firstChild);
    			}
				document.getElementById("rotate").remove();

				document.getElementById("resetbutton").style.display = "none";
				let game = this
				game.boards["player1"].showBoard();
				this.play(game.players[Math.round(Math.random())]);
			}
		}
	}

	placeAIShips(shipCount)
	{
		console.log("SHIP COUNT", shipCount)
	}

	/**
	 * Defined during setup. Manages user interaction with the boards. 
	 * @param {HTMLTableCellElement} cell a cell
	 */
	cellClicked(cell) {

	}
	/**
	 * Redefined multiple times through the game. Manages button presses relating to game flow. 
	 */
	buttonClicked() {

	}

	/**
	 * Used during turn transition. Determines the next player and displays a message
	 * @param {string} activePlayer Current player's id
	 */
	changeInstruction(activePlayer){
		var player;
		var notPlayer;
		if(activePlayer=="player1")
		{
			player = "Player 1";
			notPlayer = "Player 2";
		}else{
			player = "Player 2";
			notPlayer = "Player 1";
		}
		document.querySelector("#inst").innerText = player + "'s Turn! Pick a spot on " + notPlayer + "'s board to attack.";
	}

	/**
	 * Message that indicates that the next player's ships are appearing
	 * @param {string } inactivePlayer Not current player's id
	 */
	dontPress(inactivePlayer){
		var nextplayer;
		if(inactivePlayer=="player1")
		{
			nextplayer = "Player 1";
		}else{
			nextplayer = "Player 2";
		}
		document.querySelector("#inst").innerText = "Hand over the computer and when " + nextplayer + " is ready, End Turn!";
	}

	/**
	 * Message that says when the game is over
	 * @param {string} activePlayer Current player's id
	 */
	instDone(activePlayer){
		var player;
		if(activePlayer=="player1")
		{
			player = "Player 1";
		}else{
			player = "Player 2";
		}
		document.querySelector("#inst").innerText = "Game Over! " + player + " Won!";
	}

}

/**
 * Resets the game
 */
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#resetbutton").addEventListener("click", () => {
        location.reload();
  })
})
