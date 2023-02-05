//@ts-check
'use strict';

const { getDiv, getInput, getSelector, getDate } = require('../elementsUtil');

module.exports = {
    ui: {
        caption: getDiv('caption'),
        btnCancel: getDiv('btnCancel'),
        btnAddPlace: getDiv('btnAddPlace'),
    },

    allPlaceTable: getDiv('all-place-table'),
}