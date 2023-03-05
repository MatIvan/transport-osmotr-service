//@ts-check
'use strict';

const { getDiv, getInput, getSelector, getDate } = require('../elementsUtil');

module.exports = {
    ui: {
        caption: getDiv('caption'),
        subcaption: getDiv('subcaption'),
        btnCancel: getDiv('btnCancel'),
        btnAddGto: getDiv('btnAddGto'),
    },
    allGtoTable: getDiv('all-gto-table'),
    editLay: getDiv('edit-lay'),
}
