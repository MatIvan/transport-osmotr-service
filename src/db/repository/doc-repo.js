//@ts-check
'use strict'

const UTIL = require('../db-util')
const SQL = require('../db-sql')

/**
 * @typedef {Object} Doc 
 * @property {number} id
 * @property {number} ts_doc_type_id
 * @property {string} series
 * @property {string} number
 * @property {string} issuer
 * @property {string} date - YYYY.MM.DD
 */

module.exports = {
    getById: selectById,
    save: save,
}

/**
 * @param {number} id
 * @param {(doc: Doc) => void} callback
 */
function selectById(id, callback) {
    UTIL.selectOne(SQL.selectDocById, [id], function (/** @type {Doc} */doc) {
        callback(doc);
    });
}

/**
 * @param {Doc} doc
 * @param {(doc:Doc)=>void} callback
 */
function save(doc, callback) {
    if (doc && doc.id > 0) {
        return update(doc, () => {
            callback(doc);
        });
    }
    insert(doc, (id) => {
        doc.id = id;
        callback(doc);
    });
}

/**
 * @param {Doc} doc
 * @param {()=>void} callback
 */
function update(doc, callback) {
    const params = [
        doc.ts_doc_type_id,
        doc.series,
        doc.number,
        doc.issuer,
        doc.date,
        doc.id
    ];
    UTIL.update(SQL.sqlUpdateDoc, params, callback);
}

/**
 * @param {Doc} doc
 * @param {(id:number)=>void} callback
 */
function insert(doc, callback) {
    const params = [
        doc.ts_doc_type_id,
        doc.series,
        doc.number,
        doc.issuer,
        doc.date
    ];
    UTIL.insert(SQL.sqlInsertDoc, params, callback);
}
