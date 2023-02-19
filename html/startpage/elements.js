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
    versionInfo: getDiv('info'),
}
