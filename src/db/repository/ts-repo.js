//@ts-check
'use strict'

const UTIL = require('../db-util')
const SQL = require('../db-sql')

/**
 * @typedef {import('./owner-repo').Owner} Owner
 * @typedef {import('./doc-repo').Doc} Doc
 */

/**
 * @typedef {Object} Ts
 * @property {number} id 
 * @property {string} plate
 * @property {boolean} no_grz
 * @property {string} brand
 * @property {string} model
 * @property {number} year
 * @property {string} vin
 * @property {boolean} no_vin
 * @property {string} chassis
 * @property {string} body
 * @property {number} ts_category_id
 * @property {number} ats_type_id
 * @property {number} engine_type_id
 * @property {number} odometer
 * @property {Owner} owner
 * @property {Doc} doc
 */

module.exports = {
    getById: selectById,
    save: save,
}

/**
 * @param {number} id 
 * @param {(ts:Ts)=>void} callback 
*/
function selectById(id, callback) {
    UTIL.selectOne(SQL.selectTsById, [id], function (/** @type {Ts} */ ts) {
        // @ts-ignore
        ts.owner = { id: ts.owner_id };
        // @ts-ignore
        ts.doc = { id: ts.ts_doc_id };
        callback(ts);
    });
}

/**
 * @param {Ts} ts 
 * @param {(ts:Ts)=>void} callback 
 */
function save(ts, callback) {
    if (ts && ts.id > 0) {
        return update(ts, () => {
            callback(ts);
        });
    }
    insert(ts, (id) => {
        ts.id = id;
        callback(ts);
    });
}

/**
 * @param {Ts} ts
 * @param {()=>void} callback
 */
function update(ts, callback) {
    const params = [
        ts.plate,
        ts.no_grz,
        ts.brand,
        ts.model,
        ts.year,
        ts.vin,
        ts.no_vin,
        ts.chassis,
        ts.body,
        ts.ts_category_id,
        ts.ats_type_id,
        ts.engine_type_id,
        ts.odometer,
        ts.owner?.id,
        ts.doc?.id,
        ts.id
    ];
    UTIL.update(SQL.sqlUpdateTs, params, callback);
}

/**
 * @param {Ts} ts
 * @param {(id: number)=>void} callback
 */
function insert(ts, callback) {
    const tsParams = [
        ts.plate,
        ts.no_grz,
        ts.brand,
        ts.model,
        ts.year,
        ts.vin,
        ts.no_vin,
        ts.chassis,
        ts.body,
        ts.ts_category_id,
        ts.ats_type_id,
        ts.engine_type_id,
        ts.odometer,
        ts.owner?.id,
        ts.doc?.id
    ];
    UTIL.insert(SQL.sqlInsertTs, tsParams, callback);
}
