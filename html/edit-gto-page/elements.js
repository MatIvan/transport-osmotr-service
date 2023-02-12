//@ts-check
'use strict';

const { getDiv, getInput, getSelector, getDate } = require('../elementsUtil');

module.exports = {
    ui: {
        caption: getDiv('caption'),
        subcaption: getDiv('subcaption'),
        btnCancel: getDiv('btnCancel'),
        btnAddStaff: getDiv('btnAddGto'),
        btnEditCancel: getDiv('btnEditCancel'),
        btnEditSave: getDiv('btnEditSave'),
    },

    allGtoTable: getDiv('all-gto-table'),
    editLay: getDiv('edit-lay'),

    edit: {
        date: getDate('gto.date'),
        place_id: getSelector('gto.place_id'),
        staff_id: getSelector('gto.staff_id'),
        test_type_id: getSelector('gto.test_type_id'),
        result_id: getSelector('gto.result_id'),
        process_id: getSelector('gto.process_id'),
        period_id: getSelector('gto.period_id'),
        stop_date: getDate('gto.stop_date'),
        cost: getInput('gto.cost'),
        cost_type_id: getSelector('gto.cost_type_id'),
    }
}
