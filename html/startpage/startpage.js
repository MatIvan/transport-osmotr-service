//@ ts-check
'use strict';

const channels = require('../channels');
const UI = require('../ui');

const information = document.getElementById('info');
information.innerText = `Chrome ${versions.chrome()}; Node.js ${versions.node()}; Electron ${versions.electron()}`;

document.getElementById('editTS').onclick = () => {
    window.service.sendToMainChannel('onEditTs', 1);
}


const HANDLER = {
    //TODO
}

// TODO
// channels.bind(channels.MAIN, HANDLER);
// channels.bind(channels.DB, HANDLER);


window.service.sendToMainChannel('startpageReady');



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
