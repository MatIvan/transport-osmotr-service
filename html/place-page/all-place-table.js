//@ts-check
'use strict';

const ELEM = require('./elements');
const { createDiv } = require('../elementsUtil');

/**
 * @typedef {import('../../src/db/repository/place-repo').Place} Place
 */

/**
 * @param {Place[]} placeArray
 */
function setData(placeArray) {
    ELEM.allPlaceTable.innerHTML = '';
    for (let i = 0; i < placeArray.length; i++) {
        const place = placeArray[i];
        const row = createDiv('table-row');
        row.onclick = () => { onPlaceClickHandler(place); };
        row.innerHTML = `
            <div class="table-col col1">${place.name}</div>
            <div class="table-col col2">${place.address}</div>
            <div class="table-col col3">${place.oto_number}</div>
        `;
        ELEM.allPlaceTable.appendChild(row);
    }
}

/**
 * @param {Place} place 
 */
var onPlaceClickHandler = (place) => { };

module.exports = {
    setData: setData,
    onPlaceClick: (/** @type {(place: Place) => void} */ handler) => onPlaceClickHandler = handler,
}
