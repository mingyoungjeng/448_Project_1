function placeShipVertical(num = 3, player = "player2") {
    let tds = document.querySelectorAll(`[id*=${player}_]`);
    tds.forEach(element => {
        element.addEventListener('mouseover', (e) => {hoverShipVertical(e, num, player)});
        element.addEventListener('mouseout', (e) => {unhoverShipVertical(e, num, player)});
        element.addEventListener('click', (e) => {clickShipVertical(e, num, player)})
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
    var ship = new Ship();
    let tempNum = Number(num) + Number(currentRow);
    console.log("num + curr = " + tempNum);
    if (tempNum <= 11) {
        [...document.querySelectorAll(`[id*=${player}]`)]
        .filter(e => e.getAttribute('col') == currentColumn 
        && parseInt(currentRow) <= parseInt(e.getAttribute('row'))
        && parseInt(e.getAttribute('row')) - parseInt(currentRow) < num)
        .forEach(element => {
            element.classList.add('ship');
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
    tds.forEach(element => {
        element.addEventListener('mouseover', (e) => {hoverShipHorizontal(e, num, player)});
        element.addEventListener('mouseout', (e) => {unhoverShipHorizontal(e, num, player)});
        element.addEventListener('click', (e) => {clickShipHorizontal(e, num, player)})
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
    console.log("num + curr = " + tempNum);
    if (tempNum <= 11) {
        [...document.querySelectorAll(`[id*=${player}]`)]
        .filter(e => e.getAttribute('row') == currentRow
        && parseInt(currentColumn) <= parseInt(e.getAttribute('col').charCodeAt() - 64)
        && parseInt(e.getAttribute('col').charCodeAt() - 64) - parseInt(currentColumn) < num)
        .forEach(element => {
            element.classList.add('ship');
        });
    }
    else {
        alert("Hey, you can't place your ship here!");
    }
    
}


