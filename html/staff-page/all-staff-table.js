//@ts-check
'use strict';

const ELEM = require('./elements');
const { createDiv } = require('../elementsUtil');

/**
 * @typedef {import('../../src/db/repository/staff-repo').Staff} Staff
 * @typedef {import('../../src/db/repository/place-repo').Place} Place
 */

/**
 * @type Place[]
 */
var placeList = []

/**
 * @param {Staff[]} staffArray
 */
function setData(staffArray) {
    ELEM.allStaffTable.innerHTML = '';
    for (let i = 0; i < staffArray.length; i++) {
        const staff = staffArray[i];
        const row = createDiv('table-row');
        row.onclick = () => { onStaffClickHandler(staff); };
        row.innerHTML = `
            <div class="table-col col1">${staff.full_name}</div>
            <div class="table-col col2">${staff.code}</div>
            <div class="table-col col3">${getPlaceText(staff.place_id)}</div>
            <div class="table-col col4 center">${getActiveText(staff.active)}</div>
        `;
        ELEM.allStaffTable.appendChild(row);
    }
}

/**
 * @param {number} id 
 * @returns {string}
 */
function getPlaceText(id) {
    const place = placeList.find(place => place.id === id);
    return place ? place.address : '';
}

/**
 * @param {boolean} active
 * @returns {string}
 */
function getActiveText(active) {
    return `<input type="checkbox" ${active ? 'checked' : ''} disabled></input>`
}

/**
 * @param {Staff} staff 
 */
var onStaffClickHandler = (staff) => { };

module.exports = {
    setData: setData,
    onStaffClick: (/** @type {(staff: Staff) => void} */ handler) => onStaffClickHandler = handler,

    /**
     * @param {Place[]} placeArray
     */
    setPlaceList: (placeArray) => {
        placeList = placeArray;
    }

}
