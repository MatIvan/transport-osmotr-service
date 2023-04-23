//@ts-check
'use strict'

const UTIL = require('../db-util')
const SQL = require('../db-sql')


/**
 * @typedef {Object} StartTableBean
 * @property {number} gtoId
 * @property {string} plate
 * @property {string} tsFullName
 * @property {string} atsType
 * @property {string} test
 * @property {string} resultName
 * @property {string} tsYear
 * @property {number} cost
 * @property {string} costType
 */

module.exports = {
    getStartpageTableByDate: selectStartpageTableByDate,
}

/**
 * @param {string} date
 * @param {(bean:StartTableBean[])=>void} callback
*/
function selectStartpageTableByDate(date, callback) {
    UTIL.selectAll(SQL.selectStartpageTableByDate, [date], callback);
}
