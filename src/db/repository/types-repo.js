//@ts-check
'use strict'

const UTIL = require('../db-util')
const SQL = require('../db-sql')

/**
 * @typedef {Object} Ts_Category
 * @property {number} id
 * @property {string} name
 */

/**
 * @typedef {Object} Ats_Type
 * @property {number} id
 * @property {string} name
 * @property {number} ts_category_id
 */

/**
 * @typedef {Object} Engine_Type
 * @property {number} id
 * @property {string} name
 */

/**
 * @typedef {Object} Owner_Type
 * @property {number} id
 * @property {string} name
 */

/**
 * @typedef {Object} Ts_Doc_Type
 * @property {number} id
 * @property {string} name
 */

/**
 * @typedef {Object} GtoTestType
 * @property {number} id
 * @property {string} name
 */

/**
 * @typedef {Object} GtoResult
 * @property {number} id
 * @property {string} name
 */

/**
 * @typedef {Object} GtoProcess
 * @property {number} id
 * @property {string} name
 */

/**
 * @typedef {Object} GtoPeriod
 * @property {number} id
 * @property {string} name
 * @property {number} months
 */

/**
 * @typedef {Object} GtoCostType
 * @property {number} id
 * @property {string} name
 */

module.exports = {
    getTsCategory: selectAllTsCategory,
    getAtsTypeByCategory: selectAtsTypeByCategory,
    getEngineType: selectAllEngineType,
    getOwnerType: selectAllOwnerType,
    getDocType: selectAllDocType,
    getGtoTestType: selectGtoTestType,
    getGtoResult: selectGtoResult,
    getGtoProcess: selectGtoProcess,
    getGtoPeriod: selectGtoPeriod,
    getGtoCostType: selectGtoCostType,
}

/**
 * @param {(data:Ts_Category[])=>void} callback 
 */
function selectAllTsCategory(callback) {
    UTIL.selectAll(SQL.selectAllTsCategory, [], callback);
}

/**
 * @param {(data:Ats_Type[])=>void} callback 
 */
function selectAtsTypeByCategory(callback) {
    UTIL.selectAll(SQL.selectAllAtsType, [], callback);
}

/**
 * @param {(data:Engine_Type[])=>void} callback 
 */
function selectAllEngineType(callback) {
    UTIL.selectAll(SQL.selectAllEngineType, [], callback);
}

/**
 * @param {(data:Owner_Type[])=>void} callback 
 */
function selectAllOwnerType(callback) {
    UTIL.selectAll(SQL.selectAllOwnerType, [], callback);
}

/**
 * @param {(data:Ts_Doc_Type[])=>void} callback 
 */
function selectAllDocType(callback) {
    UTIL.selectAll(SQL.selectAllDocType, [], callback);
}

/**
 * @param {(data:GtoTestType[])=>void} callback 
 */
function selectGtoTestType(callback) {
    UTIL.selectAll(SQL.selectGtoTestType, [], callback);
}

/**
 * @param {(data:GtoResult[])=>void} callback 
 */
function selectGtoResult(callback) {
    UTIL.selectAll(SQL.selectGtoResult, [], callback);
}

/**
 * @param {(data:GtoProcess[])=>void} callback 
 */
function selectGtoProcess(callback) {
    UTIL.selectAll(SQL.selectGtoProcess, [], callback);
}

/**
 * @param {(data:GtoPeriod[])=>void} callback 
 */
function selectGtoPeriod(callback) {
    UTIL.selectAll(SQL.selectGtoPeriod, [], callback);
}

/**
 * @param {(data:GtoCostType[])=>void} callback 
 */
function selectGtoCostType(callback) {
    UTIL.selectAll(SQL.selectGtoCostType, [], callback);
}
