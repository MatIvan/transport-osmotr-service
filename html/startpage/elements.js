//@ts-check
'use strict';

const { getDiv, getInput, getDate, getSelector } = require('../elementsUtil');

module.exports = {
    ui: {
        caption: getDiv('caption'),
        filterDate: getDate('filter.date'),
        searchPlate: getInput('search-plate'),
        btnSearchPlate: getDiv('btn-search-plate'),
    },
    report: {
        btnUpdate: getDiv('btnUpdate'),
        btnReportDay: getDiv('btnReportDay'),
        btnReportMonth: getDiv('btnReportMonth'),
    },
    filter: {
        costType: getSelector('filter.costType'),
    },
    versionInfo: getDiv('info'),
    editLay: getDiv('edit-lay'),
    table: getDiv('start-table'),
}
