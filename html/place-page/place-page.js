//@ts-check
'use strict';

const RPC = require('../rpc');
const ELEM = require('./elements');
const ALL_TABLE = require('./all-place-table');
const EDIT_WIN = require('./edit-place-win');

/**
 * @typedef {import('../../src/db/repository/place-repo').Place} Place
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
    },

    placeSavedSuccess: () => {
        RPC.getAllPlace();
    }
});

ALL_TABLE.onPlaceClick((place) => {
    EDIT_WIN.show(place);
});

EDIT_WIN.bind();
EDIT_WIN.onSave((place) => {
    RPC.savePlace(place);
});

ELEM.ui.btnCancel.onclick = () => {
    RPC.showStartPage();
}

ELEM.ui.btnAddPlace.onclick = () => {
    EDIT_WIN.show(null);
}

RPC.getAllPlace();