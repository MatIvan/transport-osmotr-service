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
        select("SELECT id, ts_category_id, name FROM ats_type WHERE ts_category_id = ?;", [tsCategoryId], callback);
    },

    selectTS: function (carId, callback) {
        select(`
            SELECT  t.*, 
                    o.first_name ,o.second_name ,o.midle_name,
                    td.ts_doc_type_id,td.series ,td."number" ,td.issuer ,td.date 
            FROM ts t 
            LEFT JOIN owner o ON o.id = t.owner_id 
            LEFT JOIN ts_doc td ON td.id =t.ts_doc_id 
            WHERE t.id = ?;
            `, [carId], callback);
    },
}
