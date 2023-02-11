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

module.exports = {
    getTsCategory: selectAllTsCategory,
    getAtsTypeByCategory: selectAtsTypeByCategory,
    getEngineType: selectAllEngineType,
    getOwnerType: selectAllOwnerType,
    getDocType: selectAllDocType,
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
