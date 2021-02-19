function placeShipVertical(num) {
    var ship = new Ship(num, "ship3");
    console.log(ship);
    console.log('num = ' + num);

    document.body.addEventListener('mouseover', (e) => {hoverShipVertical(event, num)});
    document.body.addEventListener('mouseout', (e) => {unhoverShipVertical(event, num)});
    document.body.addEventListener('click', (e) => {clickShipVertical(e, num)});
}

function hoverShipVertical(event, num) {
    //console.log('num = ' + num + ' inside of mouseover');
    let currentColumn = event.target.getAttribute('col');
    let currentRow = event.target.getAttribute('row');

    if (currentColumn !== 'g') {
        let temp = [...board.cells.flat()].filter(e => e.getAttribute('col') == currentColumn 
        && parseInt(currentRow) <= parseInt(e.getAttribute('row'))
        && parseInt(e.getAttribute('row')) - parseInt(currentRow) < num);
        temp.forEach(element => {
            element.classList.replace('empty', 'ship.hover');
        });
    }
}

function unhoverShipVertical(num) {
    let oldColumn = event.target.getAttribute('col');
    if (oldColumn !== 'g') {
        let temp = [...board.cells.flat()].filter(e => e.getAttribute('col') == oldColumn);
        temp.forEach(element => {
            element.classList.replace('ship.hover', 'empty');
        });

    }
}

function clickShipVertical(event, num) {
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
}
