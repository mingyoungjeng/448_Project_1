let myListeners = {};

function placeShipVertical(num = 3, player = "player2") {
    let tds = document.querySelectorAll(`[id*=${player}_]`);
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

function unhoverShipVertical(event, num, player) {
    let currentColumn = event.target.getAttribute('col');
    
    [...document.querySelectorAll(`[id*=${player}]`)]
        .filter(e => e.getAttribute('col') == currentColumn)
        .forEach(element => {
            element.classList.replace('ship.hover', 'empty');
        });
}

function clickShipVertical(event, num, player) {
    let currentColumn = event.target.getAttribute('col');
    let currentRow = event.target.getAttribute('row');
    

    let tempNum = Number(num) + Number(currentRow);
    //console.log("num + curr = " + tempNum);
    if (tempNum <= 11) {
        [...document.querySelectorAll(`[id*=${player}]`)]
        .filter(e => e.getAttribute('col') == currentColumn 
        && parseInt(currentRow) <= parseInt(e.getAttribute('row'))
        && parseInt(e.getAttribute('row')) - parseInt(currentRow) < num)
        .forEach(element => {
            element.classList.add('ship');
        });

        let locs = [];
        for (var i = 0; i < num; i++) {
            locs[i] = currentColumn + (Number(currentRow) + Number(i));
        }
        var ship = new Ship(locs);
        console.log(ship);

        //These aren't working yet
      
        console.log(myListeners);
        let tds = document.querySelectorAll(`[id*=${player}_]`);
        tds.forEach(element => {
            //console.log(myListeners[);
            element.removeEventListener('mouseover', myListeners[element.id + "_" + num][0]);
            element.removeEventListener('mouseout', myListeners[element.id + "_" + num][1]);
            element.removeEventListener('click', myListeners[element.id + "_" + num][2]);
        });
        
    }
    else {
        alert("Hey, you can't place your ship here!");
    }
}

//--------------------------------------------------------------------------------
// Horizontal placement
//--------------------------------------------------------------------------------



function placeShipHorizontal(num = 3, player = "player1") {
    let tds = document.querySelectorAll(`[id*=${player}_]`);
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

function hoverShipHorizontal(event, num, player) {
    // Convert column headers to appropriate numbers
    let currentColumn = event.target.getAttribute('col');
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


function unhoverShipHorizontal(event, num, player) {
    
    let currentRow = event.target.getAttribute('row');
    
    [...document.querySelectorAll(`[id*=${player}]`)]
        .filter(e => e.getAttribute('row') == currentRow)
        .forEach(element => {
            element.classList.replace('ship.hover', 'empty');
        });

        
}

function clickShipHorizontal(event, num, player) {
    
    let currentColumn = event.target.getAttribute('col');
    currentColumn = currentColumn.charCodeAt() - 64;
    let currentRow = event.target.getAttribute('row');
    var ship = new Ship();

    let tempNum = Number(num) + Number(currentColumn);
    if (tempNum <= 11) {
        [...document.querySelectorAll(`[id*=${player}]`)]
        .filter(e => e.getAttribute('row') == currentRow
        && parseInt(currentColumn) <= parseInt(e.getAttribute('col').charCodeAt() - 64)
        && parseInt(e.getAttribute('col').charCodeAt() - 64) - parseInt(currentColumn) < num)
        .forEach(element => {
            element.classList.add('ship');
        });

        let locs = [];
        for (var i = 0; i < num; i++) {
            locs[i] = currentColumn + (Number(currentRow) + Number(i));
        }
        var ship = new Ship(locs);

        let tds = document.querySelectorAll(`[id*=${player}_]`);
        tds.forEach(element => {
            //console.log(myListeners);
            element.removeEventListener('mouseover', myListeners[element.id + "_" + num][0]);
            element.removeEventListener('mouseout', myListeners[element.id + "_" + num][1]);
            element.removeEventListener('click', myListeners[element.id + "_" + num][2]);
        });

    }
    else {
        alert("Hey, you can't place your ship here!");
    }
    
}


