function placeShipVertical(num = 3, player = "player1") {
    var ship = new Ship();
    //console.log(ship);
    //console.log('num = ' + num);

    let tds = document.querySelectorAll(`[id*=${player}_]`);
    tds.forEach(element => {
        element.addEventListener('mouseover', (e) => {hoverShipVertical(e, num, player)});
        element.addEventListener('mouseout', (e) => {unhoverShipVertical(e, num, player)});
        element.addEventListener('click', (e) => {clickShipVertical(e, num, player)})
    })


    //document.body.addEventListener('mouseover', (e) => {hoverShipVertical(e, num)});
    //document.body.addEventListener('mouseout', (e) => {unhoverShipVertical(event, num)});
    //document.body.addEventListener('click', (e) => {clickShipVertical(e, num)});
}

function hoverShipVertical(event, num, player) {
    //console.log(event.target);
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
    /*
    let oldColumn = event.target.getAttribute('col');
    if (oldColumn !== 'g') {
        let temp = [...board.cells.flat()].filter(e => e.getAttribute('col') == oldColumn);
        temp.forEach(element => {
            element.classList.replace('ship.hover', 'empty');
        });

    }
    */

    //console.log(event.target);
    let currentColumn = event.target.getAttribute('col');
    
    [...document.querySelectorAll(`[id*=${player}]`)]
        .filter(e => e.getAttribute('col') == currentColumn)
        .forEach(element => {
            element.classList.replace('ship.hover', 'empty');
        });
}

function clickShipVertical(event, num, player) {
    /*
    let currentColumn = event.target.getAttribute('col');
    let currentRow = event.target.getAttribute('row');

    if (currentColumn !== 'g') {
        let temp = [...board.cells.flat()].filter(e => e.getAttribute('col') == currentColumn 
        && parseInt(currentRow) <= parseInt(e.getAttribute('row'))
        && parseInt(e.getAttribute('row')) - parseInt(currentRow) < num);
        temp.forEach(element => {
            element.classList.add('ship');
        });
    }
    */

    let currentColumn = event.target.getAttribute('col');
    let currentRow = event.target.getAttribute('row');
    
    [...document.querySelectorAll(`[id*=${player}]`)]
        .filter(e => e.getAttribute('col') == currentColumn 
        && parseInt(currentRow) <= parseInt(e.getAttribute('row'))
        && parseInt(e.getAttribute('row')) - parseInt(currentRow) < num)
        .forEach(element => {
            element.classList.add('ship');
        });
}

