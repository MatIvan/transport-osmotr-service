//@ts-check
'use strict'

const db = require('./db-init')

const dbErrorHandler = function (err) {
    if (err) {
        console.error('Database error:', err)
    }
}

db.onError(dbErrorHandler)

function selectAllCars(callback) {
    db.getDB().all("SELECT id, uid, marka FROM 'car';", [], (err, data) => {
        if (err) return dbErrorHandler(err)
        callback(data)
    })
}

module.exports = {
    open: db.open,
    close: db.close,
    cars: selectAllCars,
}