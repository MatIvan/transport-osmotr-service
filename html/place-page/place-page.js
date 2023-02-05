//@ts-check
'use strict';

const RPC = require('../rpc');
const ELEM = require('./elements');
const ALL_TABLE = require('./all-place-table');

/**
 * @typedef {import('../../src/db/db-service').Place} Place
 */

RPC.bind({
    /**
     * @param {string} msg
     */
    databaseError: (msg) => {
        alert('ОШИБКА !!!\n\n' + msg);
    },

    /**
     * @param {Place[]} placeArray
     */
    allPlace: (placeArray) => {
        ALL_TABLE.setData(placeArray);
    }
});

ALL_TABLE.onPlaceClick((place) => {
    console.log("MATIV onPlaceClick: ", place);
});

RPC.getAllPlace();

ELEM.ui.btnCancel.onclick = () => {
    RPC.showStartPage();
}
