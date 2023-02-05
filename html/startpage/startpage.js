//@ts-check
'use strict';

const ELEM = require('./elements');
const RPC = require('../rpc');

const appVers = RPC.appVersions;
ELEM.versionInfo.innerText = `Chrome ${appVers.chrome()}; Node.js ${appVers.node()}; Electron ${appVers.electron()}`;

ELEM.btnEditTS.onclick = () => {
    RPC.onEditTs(6);
}

RPC.bind({
    //TODO
});

RPC.startpageReady();

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
