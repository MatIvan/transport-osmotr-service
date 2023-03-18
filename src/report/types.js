//@ts-check
'use strict'
/**
 * @typedef {import('../db/repository/report-repo').ReportData} ReportData
 * @typedef {import('../../html/date-util').DatePeriod} DatePeriod
 * @typedef {import('../db/repository/place-repo').Place} Place
 */

/**
 * @typedef {Object} ReportOptions
 * @property {string} fileName
 * @property {Place} place
 * @property {DatePeriod} period
 * @property {ReportData[]} data
 */

/**
 * @typedef {any} Workbook
 * @typedef {any} Worksheet
 */

/**
 * @typedef {Object} Model
 * @property {ReportOptions} options
 * @property {Workbook} wb
 * @property {Worksheet} ws
 * @property {number} row
 */

/**
 * @typedef {Object} Column
 * @property {string} caption
 * @property {number} width
 * @property {string} type
 * @property {(row:number, data:ReportData)=>any} value
 * @property {object} style
 */

module.exports = {}