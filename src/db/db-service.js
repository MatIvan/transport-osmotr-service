//@ts-check
'use strict'
const events = require('../local-events')
const dbInit = require('./db-init')
const SQL = require('./db-sql')

/**
 * @typedef {Object} Owner 
 * @property {number} id
 * @property {string} first_name
 * @property {string} second_name
 * @property {string} midle_name
 * @property {number} owner_type_id
 */

/**
 * @typedef {Object} TS_Doc 
 * @property {number} id
 * @property {number} ts_doc_type_id
 * @property {string} series
 * @property {string} number
 * @property {string} issuer
 * @property {string} date - YYYY.MM.DD
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
 * @property {number} owner_id
 * @property {number} ts_doc_id
 * @property {Owner} owner
 * @property {TS_Doc} doc
 */

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
 * @param {Error} err
 */
function processError(err) {
    dbInit.getDB().run(SQL.rollback);
    console.error('Database select error:', JSON.stringify(err));
    events.emit(events.DB.ERROR, err);
}

/**
 * @param {string} sql 
 * @param {any} param 
 * @param {(data:any[])=>void} callback 
 */
function selectAll(sql, param, callback) {
    console.log(`selectAll: ${sql}, params=${param}`);
    dbInit.getDB().all(sql, param, (err, data) => {
        console.log(`selectAll result: err=${!!err}, data=${data}`);
        if (err) return processError(err);
        callback(data);
    });
}

/**
 * @param {string} sql 
 * @param {any} param 
 * @param {(data:any)=>void} callback 
 */
function selectOne(sql, param, callback) {
    console.log(`selectOne: ${sql}, params=${param}`);
    dbInit.getDB().get(sql, param, function (err, data) {
        console.log(`selectOne result: err=${!!err}, data=${data}`);
        if (err) return processError(err);
        if (!data) return processError(new Error("Not found."));
        callback(data);
    });
}

/**
 * @param {string} sql 
 * @param {any} param 
 * @param {(id:number)=>void} callback 
 */
function insert(sql, param, callback) {
    console.log(`insert: ${sql}, params=${param}`);
    dbInit.getDB().run(sql, param, function (err) {
        const id = this.lastID;
        console.log(`insert result: err=${!!err}, id=${id}`);
        if (err) return processError(err);
        callback(id);
    });
}

module.exports = {
    open: dbInit.open,
    close: dbInit.close,

    /**
     * @param {(data:Ts_Category[])=>void} callback 
     */
    selectAllTsCategory: function (callback) {
        selectAll(SQL.selectAllTsCategory, [], callback);
    },

    /**
     * @param {number} tsCategoryId 
     * @param {(data:Ats_Type[])=>void} callback 
     */
    selectAtsTypeByCategory: function (tsCategoryId, callback) {
        selectAll(SQL.selectAtsTypeByCategory, [tsCategoryId], callback);
    },

    /**
     * @param {number} tsId 
     * @param {(ts:Ts)=>void} callback 
    */
    selectTS: function (tsId, callback) {
        dbInit.getDB().run(SQL.beginTransaction, () => {

            console.log(`selectTsById id=${tsId} ...`);
            selectOne(SQL.selectTsById, [tsId], function (/** @type {Ts} */ ts) {
                selectOne(SQL.selectOwnerById, [ts.owner_id], function (/** @type {Owner} */owner) {
                    selectOne(SQL.selectDocById, [ts.ts_doc_id], function (/** @type {TS_Doc} */doc) {
                        /** @type {Ts} */
                        const resultTs = {
                            ...ts,
                            owner: owner,
                            doc: doc,
                        }
                        console.log(`selectTS result: ${JSON.stringify(resultTs)}`);
                        callback(resultTs);
                    });
                });
            });
        });
    },

    /**
     * @param {(data:Engine_Type[])=>void} callback 
     */
    selectAllEngineType: function (callback) {
        selectAll(SQL.selectAllEngineType, [], callback);
    },

    /**
     * @param {(data:Owner_Type[])=>void} callback 
     */
    selectAllOwnerType: function (callback) {
        selectAll(SQL.selectAllOwnerType, [], callback);
    },

    /**
     * @param {(data:Ts_Doc_Type[])=>void} callback 
     */
    selectAllDocType: function (callback) {
        selectAll(SQL.selectAllDocType, [], callback);
    },

    /**
     * @param {Ts} ts 
     * @param {(tsId:number)=>void} callback 
     */
    saveTs: function (ts, callback) {
        dbInit.getDB().run(SQL.beginTransaction, () => {
            insertOwner(ts.owner, (ownerId) => {
                ts.owner_id = ownerId;
                insertDoc(ts.doc, (docId) => {
                    ts.ts_doc_id = docId;
                    insertTs(ts, (tsId) => {
                        dbInit.getDB().run(SQL.commit);
                        callback(tsId);
                    });
                });
            });
        });
    }
}

/**
 * @param {Owner} owner
 * @param {(ownerId:number)=>void} callback
 */
function insertOwner(owner, callback) {
    const ownerParams = [
        owner.first_name,
        owner.second_name,
        owner.midle_name,
        owner.owner_type_id
    ];
    insert(SQL.sqlInsertOwner, ownerParams, callback);
}

/**
 * @param {TS_Doc} doc
 * @param {(docId:number)=>void} callback
 */
function insertDoc(doc, callback) {
    const docParams = [
        doc.ts_doc_type_id,
        doc.series,
        doc.number,
        doc.issuer,
        doc.date
    ];
    insert(SQL.sqlInsertDoc, docParams, callback);
}

/**
 * @param {Ts} ts
 * @param {(tsId:number)=>void} callback
 */
function insertTs(ts, callback) {
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
        ts.owner_id,
        ts.ts_doc_id
    ];
    insert(SQL.sqlInsertTs, tsParams, callback);
}
