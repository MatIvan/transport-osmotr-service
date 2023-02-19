//@ts-check
'use strict'

const events = require('../local-events')
const dbInit = require('./db-init')
const SQL = require('./db-sql')

module.exports = {
    transaction: transaction,
    commit: commit,
    selectAll: selectAll,
    selectOne: selectOne,
    insert: insert,
    update: update,
}


/**
 * @param {(this: import('sqlite3').RunResult, err: Error | null) => void} callback
 */
function transaction(callback) {
    dbInit.getDB().run(SQL.beginTransaction, callback);
}

function commit() {
    dbInit.getDB().run(SQL.commit);
}

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
    console.log(`selectAll: ${sql}, params=${JSON.stringify(param)}`);
    dbInit.getDB().all(sql, param, (err, data) => {
        console.log(`selectAll result: err=${!!err}, data=${JSON.stringify(data)}`);
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
    console.log(`selectOne: ${sql}, params=${JSON.stringify(param)}`);
    dbInit.getDB().get(sql, param, function (err, data) {
        console.log(`selectOne result: err=${!!err}, data=${JSON.stringify(data)}`);
        if (err) return processError(err);
        //if (!data) return processError(new Error("Not found."));
        callback(data);
    });
}

/**
 * @param {string} sql 
 * @param {any} param 
 * @param {(id:number)=>void} callback 
 */
function insert(sql, param, callback) {
    console.log(`insert: ${sql}, params=${JSON.stringify(param)}`);
    dbInit.getDB().run(sql, param, function (err) {
        const id = this.lastID;
        console.log(`insert result: err=${!!err}, id=${id}`);
        if (err) return processError(err);
        callback(id);
    });
}

/**
 * @param {string} sql 
 * @param {any} param 
 * @param {()=>void} callback 
 */
function update(sql, param, callback) {
    console.log(`update: ${sql}, params=${JSON.stringify(param)}`);
    dbInit.getDB().run(sql, param, function (err) {
        console.log(`update result: err=${!!err}`);
        if (err) return processError(err);
        callback();
    });
}
