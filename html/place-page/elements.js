//@ts-check
'use strict';

const { getDiv, getInput, getSelector, getDate } = require('../elementsUtil');

module.exports = {
    ui: {
        caption: getDiv('caption'),
        btnCancel: getDiv('btnCancel'),
        btnAddPlace: getDiv('btnAddPlace'),
        btnEditCancel: getDiv('btnEditCancel'),
        btnEditSave: getDiv('btnEditSave'),
    },

    allPlaceTable: getDiv('all-place-table'),
    editLay: getDiv('edit-lay'),

    edit: {
        name: getInput('place.name'),
        address: getInput('place.address'),
        otoNumber: getInput('place.oto_number'),
    }
}
