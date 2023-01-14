'use strict';

const UI = require('../ui');

const information = document.getElementById('info');
information.innerText = `Chrome ${versions.chrome()}; Node.js ${versions.node()}; Electron ${versions.electron()}`;

window.handlers.onReady((event, data) => {
    //event.sender.send('event-name', data) //respose
    console.log('onReady: ', data);
    //window.service.db.getCars();
    UI.echo("sd");
})

window.handlers.onError((event, err) => {
    console.log('onError: ', err);
})

window.handlers.db.onCars((event, cars) => {
    console.log('onCars: ', cars);
    buildTableCars(cars);
})

window.service.ready();
console.log('Renderer is loaded.');

/**
 * 
 * @param {[]} cars 
 */
function buildTableCars(cars) {
    const tableBody = document.getElementById('cars-table-body');
    let rows = '';
    for (let i = 0; i < cars.length; i++) {
        const car = cars[i];
        rows += `
            <tr class="button">
              <td>${car.id}</td>
              <td>${car.uid}</td>
              <td>${car.marka}</td>
            </tr>
        `;
    }
    tableBody.innerHTML = rows || '<tr><td>no data</td><td></td><td></td></tr>';
}
