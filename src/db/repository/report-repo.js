//@ts-check
'use strict'

const UTIL = require('../db-util')
const SQL = require('../db-sql')

/**
 * @typedef {Object} ReportData
 * @property {string} date - YYYY-MM-DD
 * @property {string} staff
 * @property {string} test_type
 * @property {string} plate
 * @property {number} release_year
 * @property {string} ats_type
 * @property {string} marka
 * @property {string} owner
 * @property {string} period
 * @property {number} cost
 * @property {string} cost_type
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
