//@ts-check
'use strict';

const { getDiv, getInput, getDate } = require('../elementsUtil');

module.exports = {
    ui: {
        caption: getDiv('caption'),
        filterDate: getDate('filter.date'),
        searchPlate: getInput('search-plate'),
        btnSearchPlate: getDiv('btn-search-plate'),
    },
    report: {
        btnReportDay: getDiv('btnReportDay'),
        btnReportMonth: getDiv('btnReportMonth'),
    },
    versionInfo: getDiv('info'),
    editLay: getDiv('edit-lay'),
    table: getDiv('start-table'),
}
