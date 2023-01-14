//@ts-check
'use strict'
const events = require('../local-events')
const dbInit = require('./db-init')

function select(sql, param, callback) {
    dbInit.getDB().all(sql, param, (err, data) => {
        if (err) {
            console.error('Database select error:', err, sql, param);
            console.error('sql: ', sql);
            console.error('param: ', param);
            events.emit(events.DB.ERROR, err);
            return;
        }
        callback(data);
    });
}

module.exports = {
    open: dbInit.open,
    close: dbInit.close,

    selectAllCars: function (callback) {
        select("SELECT id, uid, marka FROM 'car';", [], callback);
    },

    selectAllTsCategory: function (callback) {
        select("SELECT id, name FROM ts_category;", [], callback);
    },

    selectAtsTypeByCategory: function (tsCategoryId, callback) {
        select("SELECT id, ts_id, name FROM ats_type WHERE ts_category_id = ?;", [tsCategoryId], callback);
    },
    
}
