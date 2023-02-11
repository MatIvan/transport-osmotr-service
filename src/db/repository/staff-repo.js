//@ts-check
'use strict'

const UTIL = require('../db-util')
const SQL = require('../db-sql')

/**
 * @typedef {Object} Staff
 * @property {number} id
 * @property {string} full_name
 * @property {string} code
 * @property {number} place_id
 * @property {boolean} active
 */

module.exports = {
    getAll: selectAll,
    save: save,
}

/**
 * @param {Staff} staff 
 * @param {(place:Staff)=>void} callback 
 */
function save(staff, callback) {
    if (staff && staff.id > 0) {
        return update(staff, callback);
    }
    insert(staff, callback);
}

/**
 * @param {Staff} staff
 * @param {(staff:Staff)=>void} callback
 */
function update(staff, callback) {
    const params = [
        staff.full_name,
        staff.code,
        staff.place_id,
        staff.active,
        staff.id
    ];
    UTIL.update(SQL.sqlUpdateStaff, params, () => {
        callback(staff);
    });
}

/**
 * @param {Staff} staff
 * @param {(staff:Staff)=>void} callback
 */
function insert(staff, callback) {
    const params = [
        staff.full_name,
        staff.code,
        staff.place_id,
        staff.active,
    ];
    UTIL.insert(SQL.sqlInsertStaff, params, (id) => {
        staff.id = id;
        callback(staff);
    });
}

/**
 * @param {(data:Staff[])=>void} callback 
 */
function selectAll(callback) {
    UTIL.selectAll(SQL.selectAllStaff, [], callback);
}
