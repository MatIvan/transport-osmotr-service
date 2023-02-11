//@ts-check
'use strict';

const { getDiv, getInput, getSelector, getDate } = require('../elementsUtil');

module.exports = {
    ui: {
        caption: getDiv('caption'),
        btnCancel: getDiv('btnCancel'),
        btnAddStaff: getDiv('btnAddStaff'),
        btnEditCancel: getDiv('btnEditCancel'),
        btnEditSave: getDiv('btnEditSave'),
    },

    allStaffTable: getDiv('all-staff-table'),
    editLay: getDiv('edit-lay'),

    edit: {
        fullName: getInput('staff.full_name'),
        code: getInput('staff.code'),
        place: getSelector('staff.place_id'),
        active: getInput('staff.active'),
    }
}
