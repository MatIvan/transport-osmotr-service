//@ts-check
'use strict'

const UTIL = require('../db-util')
const SQL = require('../db-sql')

/**
 * @typedef {Object} Gto
 * @property {number} id
 * @property {number} ts_id
 * @property {string} date
 * @property {number} place_id
 * @property {number} staff_id
 * @property {number} test_type_id
 * @property {number} result_id
 * @property {number} process_id
 * @property {number} period_id
 * @property {string} stop_date
 * @property {number} cost
 * @property {number} cost_type_id
 */

module.exports = {
    getByTs: selectByTs,
    save: save,
}

/**
 * @param {Gto} gto
 * @param {(gto:Gto)=>void} callback 
 */
function save(gto, callback) {
    if (gto && gto.id > 0) {
        return update(gto, callback);
    }
    insert(gto, callback);
}

/**
 * @param {Gto} gto
 * @param {(gto:Gto)=>void} callback
 */
function update(gto, callback) {
    const params = [
        gto.date,
        gto.place_id,
        gto.staff_id,
        gto.test_type_id,
        gto.result_id,
        gto.process_id,
        gto.period_id,
        gto.stop_date,
        gto.cost,
        gto.cost_type_id,
        gto.id,
    ];
    UTIL.update(SQL.sqlUpdateGto, params, () => {
        callback(gto);
    });
}

/**
 * @param {Gto} gto
 * @param {(gto:Gto)=>void} callback
 */
function insert(gto, callback) {
    const params = [
        gto.ts_id,
        gto.date,
        gto.place_id,
        gto.staff_id,
        gto.test_type_id,
        gto.result_id,
        gto.process_id,
        gto.period_id,
        gto.stop_date,
        gto.cost,
        gto.cost_type_id,
    ];
    UTIL.insert(SQL.sqlInsertGto, params, (id) => {
        gto.id = id;
        callback(gto);
    });
}

/**
 * @param {number} tsId
 * @param {(gto: Gto[]) => void} callback
 */
function selectByTs(tsId, callback) {
    UTIL.selectAll(SQL.selectGtoByTs, [tsId], callback);
}
