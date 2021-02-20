function placeShipVertical(num = 3, player = "player1") {
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
        console.log("Hey, you can't place your ship here");
    }

    
}

