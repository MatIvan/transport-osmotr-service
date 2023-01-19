//@ts-check
'use strict';

const UI = require('../ui');

const information = document.getElementById('info');
information.innerText = `Chrome ${versions.chrome()}; Node.js ${versions.node()}; Electron ${versions.electron()}`;


bindHandlers();

window.service.sendToMainChannel('startpageReady');
window.service.sendToDataBaseChannel('getTsCategory');

function bindHandlers() {
    window.handlers.onMainChannel((cmd, data) => {
        console.log('onMainChannel: ', cmd, data);
    });

    window.handlers.onDatabaseChannel((cmd, data) => {
        console.log('onDatabaseChannel: ', cmd, data);
    });
}

// function buildTableCars(cars) {
//     const tableBody = document.getElementById('cars-table-body');
//     let rows = '';
//     for (let i = 0; i < cars.length; i++) {
//         const car = cars[i];
//         rows += `
//             <tr class="button">
//               <td>${car.id}</td>
//               <td>${car.uid}</td>
//               <td>${car.marka}</td>
//             </tr>
//         `;
//     }
//     tableBody.innerHTML = rows || '<tr><td>no data</td><td></td><td></td></tr>';
// }
