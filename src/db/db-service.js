//@ts-check
'use strict'
const events = require('../local-events')
const dbInit = require('./db-init')
const SQL = require('./db-sql')

/**
 * @callback InsertCallback
 * @param {any} err
 * @param {number | null} id
 */

/**
 * @typedef {Object} Owner 
 * @property {string} first_name
 * @property {string} second_name
 * @property {string} midle_name
 * @property {number} type_id
 */

/**
 * @typedef {Object} Doc 
 * @property {number} type_id
 * @property {string} series
 * @property {string} number
 * @property {string} issuer
 * @property {string} date - YYYY.MM.DD
 */

/**
 * @typedef {Object} Ts
 * @property {number} type_id
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
 * @property {number} ownerId
 * @property {number} docId
 */


function processError(err, sql, param) {
    dbInit.getDB().run(SQL.rollback);
    console.error('Database select error:', err);
    console.error('sql: ', sql);
    console.error('param: ', param);
    events.emit(events.DB.ERROR, err);
}

function select(sql, param, callback) {
    dbInit.getDB().all(sql, param, (err, data) => {
        if (err) {
            return processError(err, sql, param);
        }
        callback(data);
    });
}

module.exports = {
    open: dbInit.open,
    close: dbInit.close,

    selectAllCars: function (callback) {
        select(SQL.selectAllCars, [], callback);
    },

    selectAllTsCategory: function (callback) {
        select(SQL.selectAllTsCategory, [], callback);
    },

    selectAtsTypeByCategory: function (tsCategoryId, callback) {
        select(SQL.selectAtsTypeByCategory, [tsCategoryId], callback);
    },

    selectTS: function (tsId, callback) {
        select(SQL.selectTS, [tsId], callback);
    },

    selectAllEngineType: function (callback) {
        select(SQL.selectAllEngineType, [], callback);
    },

    selectAllOwnerType: function (callback) {
        select(SQL.selectAllOwnerType, [], callback);
    },

    selectAllDocType: function (callback) {
        select(SQL.selectAllDocType, [], callback);
    },

    saveTs: function (ts, callback) {
        dbInit.getDB().run(SQL.beginTransaction, () => {

            insertOwner(ts.owner, (err, ownerId) => {
                if (err) return processError(err, 'insertOwner', ts.owner);

                insertDoc(ts.doc, (err, docId) => {
                    if (err) return processError(err, 'insertDoc', ts.doc);

                    ts.ownerId = ownerId;
                    ts.docId = docId;
                    insertTs(ts, (err, tsId) => {
                        if (err) return processError(err, 'insertTs', ts);
                        dbInit.getDB().run("COMMIT;");
                        callback();
                    });
                });
            });
        });
    }
}

/**
 * @param {Owner} owner
 * @param {InsertCallback} callback
 */
function insertOwner(owner, callback) {
    console.log('insertOwner...', JSON.stringify(owner));
    const ownerParams = [
        owner.first_name,
        owner.second_name,
        owner.midle_name,
        owner.type_id
    ];
    dbInit.getDB().run(SQL.sqlInsertOwner, ownerParams, function (err) {
        const id = this.lastID;
        console.log(`insertOwner result: err=${!!err}, id=${id}`);
        callback(err, id);
    });
}

/**
 * @param {Doc} doc
 * @param {InsertCallback} callback
 */
function insertDoc(doc, callback) {
    console.log('insertDoc...', JSON.stringify(doc));
    const docParams = [
        doc.type_id,
        doc.series,
        doc.number,
        doc.issuer,
        doc.date
    ];
    dbInit.getDB().run(SQL.sqlInsertDoc, docParams, function (err) {
        const id = this.lastID;
        console.log(`insertDoc result: err=${!!err}, id=${id}`);
        callback(err, id);
    });
}

/**
 * @param {Ts} ts
 * @param {InsertCallback} callback
 */
function insertTs(ts, callback) {
    console.log('insertTs...', JSON.stringify(ts));
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
        ts.ownerId,
        ts.docId
    ];
    dbInit.getDB().run(SQL.sqlInsertTs, tsParams, function (err) {
        const id = this.lastID;
        console.log(`insertTs result: err=${!!err}, id=${id}`);
        callback(err, id);
    });
}
