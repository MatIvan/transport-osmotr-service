//@ts-check
'use strict';

const RPC = require('../rpc');
const ELEM = require('./elements');
const ALL_TABLE = require('./all-place-table');
const EDIT_WIN = require('./edit-place-win');
const WAIT_WIN = require('../wait-win');

/**
 * @typedef {import('../../src/db/repository/place-repo').Place} Place
 */

WAIT_WIN.show();

RPC.bind({
    /**
     * @param {string} msg
     */
    databaseError: (msg) => {
        alert('ОШИБКА !!!\n\n' + msg);
        WAIT_WIN.hide();
    },

    /**
     * @param {Place[]} placeArray
     */
    allPlace: (placeArray) => {
        ALL_TABLE.setData(placeArray);
        WAIT_WIN.hide();
    },

    placeSavedSuccess: () => {
        WAIT_WIN.show();
        RPC.getAllPlace();
    }
});

ALL_TABLE.onPlaceClick((place) => {
    EDIT_WIN.show(place);
});

EDIT_WIN.bind();
EDIT_WIN.onSave((place) => {
    WAIT_WIN.show();
    RPC.savePlace(place);
});

ELEM.ui.btnCancel.onclick = () => {
    RPC.showStartPage();
}

ELEM.ui.btnAddPlace.onclick = () => {
    EDIT_WIN.show(null);
}

RPC.getAllPlace();