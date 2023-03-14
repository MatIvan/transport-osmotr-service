//@ts-check
'use strict'

const UTIL = require('../db-util')
const SQL = require('../db-sql')

/**
 * @typedef {Object} ReportData
 * @property {number} id 
 * @property {string} plate
 */

module.exports = {
    selectReportData,
}

/**
 * @param {string} dateFrom - YYYY-MM-DD
 * @param {string} dateTo - YYYY-MM-DD
 * @param {(reportData: ReportData[]) => void} callback
 */
function selectReportData(dateFrom, dateTo, callback) {
    UTIL.selectAll(SQL.selectReportData, [dateFrom, dateTo], callback);
}
