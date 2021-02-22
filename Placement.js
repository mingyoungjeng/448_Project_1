let myListeners = {};
let isHorizontal = true;
let currPlayer = "";
let currNum = 0;

/**
 * Function allows rotation of ships
 * @Parem     none
 * @return    none
 */
function rotate() {
    console.log('running rotate');
    // remove old event listeners
    let tds = document.querySelectorAll(`[id*=${currPlayer}_]`);
        tds.forEach(element => {
            //console.log(myListeners);
            element.removeEventListener('mouseover', myListeners[element.id + "_" + currNum][0]);
            element.removeEventListener('mouseout', myListeners[element.id + "_" + currNum][1]);
            element.removeEventListener('click', myListeners[element.id + "_" + currNum][2]);
        });
    if (isHorizontal) {
        console.log('changing to vertical');
        isHorizontal = false;
        placeShipVertical(currNum, currPlayer);
    }
    else {
        console.log('changing to horizontal');
        isHorizontal = true;
        placeShipHorizontal(currNum, currPlayer);
    }
}

/**
* Deletes event listeners
* @Parem none
* @return none
*/
function removeAll() {
    console.log("wiping the slate");
    let tds = document.querySelectorAll(`[id*=${currPlayer}_]`);
        tds.forEach(element => {
            for (var i = 1; i <= 6; i++) {
                try {
                    //console.log(myListeners[element.id + "_" + i]);
                    element.removeEventListener('mouseover', myListeners[element.id + "_" + i][0]);
                    element.removeEventListener('mouseout', myListeners[element.id + "_" + i][1]);
                    element.removeEventListener('click', myListeners[element.id + "_" + i][2]);
                } catch {
                    //console.log("nothing to remove");
                }

            }
        });
}

/**
 * This function allows to place ships vertical
 * @async 
 * @param {number} num the length of a ship
 * @param {string} player name of a player
 * @return none
 */
async function placeShipVertical(num, player) {
    currPlayer = player;
    let tds = document.querySelectorAll(`[id*=${player}_]`);
    try {
        await tds.forEach(element => {
        //console.log(myListeners);
        element.removeEventListener('mouseover', myListeners[element.id + "_" + currNum][0]);
        element.removeEventListener('mouseout', myListeners[element.id + "_" + currNum][1]);
        element.removeEventListener('click', myListeners[element.id + "_" + currNum][2]);
        });
    } catch(e) {
        console.log("Couldn't remove listeners");
    }
    currNum = num;

    //myListeners = {};
    tds.forEach(element => {
        function L1 (event) {
            hoverShipVertical(event, num, player);
        }
        function L2 (event) {
            unhoverShipVertical(event, num, player);
        }
        function L1 (event) {
            hoverShipVertical(event, num, player);
        }
        function L3 (event) {
            clickShipVertical(event, num, player);
        }
        myListeners[element.id + "_" + num] = [L1, L2, L3];
        element.addEventListener('mouseover', L1);
        element.addEventListener('mouseout', L2);
        element.addEventListener('click', L3)
    })
}

/**
 * 
 * @param {Event} event a mouse movement usually. 
 * @param {number} num the length of a ship
 * @param {string} player name of a player
 */
function hoverShipVertical(event, num, player) {
    let currentColumn = event.target.getAttribute('col');
    let currentRow = event.target.getAttribute('row');

    [...document.querySelectorAll(`[id*=${player}]`)]
        .filter(e => e.getAttribute('col') == currentColumn
        && parseInt(currentRow) <= parseInt(e.getAttribute('row'))
        && parseInt(e.getAttribute('row')) - parseInt(currentRow) < num)
        .forEach(element => {
            element.classList.replace('empty', 'ship.hover');
        });

}

/**
*Checks for location of vertical ship
*@Parem     event, num, player
*@return    none
*/
/**
 * Checks for location of vertical ship
 * @param {Event} event a mouse movement usually. 
 * @param {number} num the length of a ship
 * @param {string} player name of a player
 */
function unhoverShipVertical(event, num, player) {
    let currentColumn = event.target.getAttribute('col');

    [...document.querySelectorAll(`[id*=${player}]`)]
        .filter(e => e.getAttribute('col') == currentColumn)
        .forEach(element => {
            element.classList.replace('ship.hover', 'empty');
        });
}

/**
 * Checks for overlap on ships if it is not then the placement of the ships continues
 * @param {Event} event a mouse movement usually. 
 * @param {number} num the length of a ship
 * @param {string} player name of a player
 */
function clickShipVertical(event, num, player) {
    isHorizontal = true;
    let currentColumn = event.target.getAttribute('col');
    let currentRow = event.target.getAttribute('row');
    let overlap = false;

    let tempNum = Number(num) + Number(currentRow);
    //console.log("num + curr = " + tempNum);
    if (tempNum <= 11) {
        var myEntries = [...document.querySelectorAll(`[id*=${player}]`)]
        .filter(e => e.getAttribute('col') == currentColumn
        && parseInt(currentRow) <= parseInt(e.getAttribute('row'))
        && parseInt(e.getAttribute('row')) - parseInt(currentRow) < num);

        overlap = myEntries.some(function(element) {
            for (var ship of document.game.boards[player].ships) {
                console.log('ship = ' + ship);
                for (var item of Object.keys(ship.locations)) {
                    console.log('\t item = ' + item);
                    if (element.location == item) {
                        //alert('Those ships are overlapping!');
                        return true;
                    }
                }
            }
        });

        if (!overlap) {
            myEntries.forEach(element => {
                element.classList.remove('ship.hover');
                element.classList.add('ship', 'empty');
            })


            let locs = [];
            for (var i = 0; i < num; i++) {
                locs[i] = currentColumn + (Number(currentRow) + Number(i));
            }

            //create new ship and push it to the player's board
            var ship = new Ship(locs);
            document.game.boards[player].ships.push(ship);

            //console.log(myListeners);
            let tds = document.querySelectorAll(`[id*=${player}_]`);
            tds.forEach(element => {
                //console.log(myListeners[);
                element.removeEventListener('mouseover', myListeners[element.id + "_" + num][0]);
                element.removeEventListener('mouseout', myListeners[element.id + "_" + num][1]);
                element.removeEventListener('click', myListeners[element.id + "_" + num][2]);
            });

            document.querySelector('#button_' + num).disabled = true;

            let shipCnt = document.getElementById("shipCnt");
            shipCnt.placed.push(num);
            shipCnt.placedUpdate();
        }


    }
    else {
        alert("Hey, you can't place your ship here!");
    }

}

//--------------------------------------------------------------------------------
// Horizontal placement
//--------------------------------------------------------------------------------


/**
 * This function allows to place ships horizontal
 * @async 
 * @param {number} num the length of a ship
 * @param {string} player name of a player
 * @return none
 */
async function placeShipHorizontal(num, player) {
    currPlayer = player;
    let tds = document.querySelectorAll(`[id*=${player}_]`);
    try {
        await tds.forEach(element => {
        //console.log(myListeners);
        element.removeEventListener('mouseover', myListeners[element.id + "_" + currNum][0]);
        element.removeEventListener('mouseout', myListeners[element.id + "_" + currNum][1]);
        element.removeEventListener('click', myListeners[element.id + "_" + currNum][2]);
        });
    } catch(e) {
        console.log("Couldn't remove listeners");
    }
    currNum = num;

    //myListeners = {};
    tds.forEach(element => {
        function L1 (event) {
            hoverShipHorizontal(event, num, player);
        }
        function L2 (event) {
            unhoverShipHorizontal(event, num, player);
        }
        function L3 (event) {
            clickShipHorizontal(event, num, player);
        }
        myListeners[element.id + "_" + num] = [L1, L2, L3];
        element.addEventListener('mouseover', L1);
        element.addEventListener('mouseout', L2);
        element.addEventListener('click', L3);
    })

}

/**
 * Adds a hover class to each cell horizontally within num of the event location
 * @param {Event} event a mouse movement usually. 
 * @param {number} num the length of a ship
 * @param {string} player name of a player
 */
function hoverShipHorizontal(event, num, player) {
    // Convert column headers to appropriate numbers
    let currentColumn = event.target.getAttribute('col');
    if (currentColumn) {
        currentColumn = currentColumn.charCodeAt() - 64;
        let currentRow = event.target.getAttribute('row');
        //console.log(`currentColumn = ${currentColumn}, ${event.target.getAttribute('col')}`);
        //console.log(currentColumn);

        [...document.querySelectorAll(`[id*=${player}]`)]
            .filter(e => e.getAttribute('row') == currentRow
            && parseInt(currentColumn) <= parseInt(e.getAttribute('col').charCodeAt() - 64)
            && parseInt(e.getAttribute('col').charCodeAt() - 64) - parseInt(currentColumn) < num)
            .forEach(element => {
                element.classList.replace('empty', 'ship.hover');
            });
        }

}

/**
 * Removes hover class from each cell horizontal of event location
 * @param {Event} event a mouse movement usually. 
 * @param {number} num the length of a ship
 * @param {string} player name of a player
 */
function unhoverShipHorizontal(event, num, player) {

    let currentRow = event.target.getAttribute('row');

    [...document.querySelectorAll(`[id*=${player}]`)]
        .filter(e => e.getAttribute('row') == currentRow)
        .forEach(element => {
            element.classList.replace('ship.hover', 'empty');
        });


}

/**
 * Adds ship class to each cell withing num distance to the right of event location
 * @param {Event} event a mouse movement usually. 
 * @param {number} num the length of a ship
 * @param {string} player name of a player
 */
function clickShipHorizontal(event, num, player) {
    // reset isHorizontal for next placement
    isHorizontal = true;

    let currentColumnChar = event.target.getAttribute('col');
    currentColumn = currentColumnChar.charCodeAt() - 64;
    let currentRow = event.target.getAttribute('row');
    var ship = new Ship();
    var overlap = false;

    let tempNum = Number(num) + Number(currentColumn);
    if (tempNum <= 11) {
        var myEntries =
            [...document.querySelectorAll(`[id*=${player}]`)]
            .filter(e => e.getAttribute('row') == currentRow
            && parseInt(currentColumn) <= parseInt(e.getAttribute('col').charCodeAt() - 64)
            && parseInt(e.getAttribute('col').charCodeAt() - 64) - parseInt(currentColumn) < num);

            overlap = myEntries.some(function(element) {
                for (var ship of document.game.boards[player].ships) {
                    //console.log('ship = ' + ship);
                    for (var item of Object.keys(ship.locations)) {
                        //onsole.log('\t item = ' + item);
                        if (element.location == item) {
                            //alert('Those ships are overlapping!');
                            return true;
                        }
                    }
                }
            });

        if (!overlap) {
            myEntries.forEach(element => {
                element.classList.remove('ship.hover');
                element.classList.add('ship', 'empty');
            })

            let locs = [];
            for (var i = 0; i < num; i++) {
                locs[i] = String.fromCharCode(currentColumn + i + 64) + (Number(currentRow));
            }

            // create new ship and push it to the player's board
            var ship = new Ship(locs);
            document.game.boards[player].ships.push(ship);

            let tds = document.querySelectorAll(`[id*=${player}_]`);
            tds.forEach(element => {
                element.removeEventListener('mouseover', myListeners[element.id + "_" + num][0]);
                element.removeEventListener('mouseout', myListeners[element.id + "_" + num][1]);
                element.removeEventListener('click', myListeners[element.id + "_" + num][2]);
            });

            document.querySelector('#button_' + num).disabled = true;

            let shipCnt = document.getElementById("shipCnt");
            shipCnt.placed.push(num);
            shipCnt.placedUpdate();
        }
    }
    else {
        alert("Hey, you can't place your ship here!");
    }

}
