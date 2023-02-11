//@ts-check
'use strict';

const RPC = require('../rpc');
const ELEM = require('./elements');
const ALL_TABLE = require('./all-staff-table');
const EDIT_WIN = require('./edit-staff-win');

/**
 * @typedef {import('../../src/db/repository/staff-repo').Staff} Staff
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
    * @param {Staff[]} staffArray
    */
    allStaff: (staffArray) => {
        ALL_TABLE.setData(staffArray);
    },

    /**
    * @param {Place[]} placeArray
    */
    allPlace: (placeArray) => {
        ALL_TABLE.setPlaceList(placeArray);
        EDIT_WIN.setPlaceList(placeArray);
    },

    staffSavedSuccess: () => {
        RPC.getAllStaff();
    }
});

ALL_TABLE.onStaffClick((staff) => {
    EDIT_WIN.show(staff);
});

EDIT_WIN.bind();
EDIT_WIN.onSave((staff) => {
    RPC.saveStaff(staff);
});

ELEM.ui.btnCancel.onclick = () => {
    RPC.showStartPage();
}

ELEM.ui.btnAddStaff.onclick = () => {
    EDIT_WIN.show(null);
}

RPC.getAllPlace();
RPC.getAllStaff();
