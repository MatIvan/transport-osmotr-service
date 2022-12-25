//@ts-check
'use strict'

const sqlite3 = require('sqlite3').verbose()
const fs = require("fs")
const path = require('path')

var db
var onErrorHandler

module.exports = {

    getDB: function () {
        return db
    },

    onError: function (handler) {
        onErrorHandler = handler
    },

    open: function () {
        const dbFile = path.join(global.appRoot, 'database.sqlite')
        db = new sqlite3.Database(dbFile, (err) => {
            if (err) return onErrorHandler(err)
            init()
        })
        db.addListener('open', () => { console.log('DB onOpen') })
        db.addListener('close', () => { console.log('DB onClose') })
        db.addListener('error', (err) => { console.log('DB onError', err.message) })
    },

    close: function () {
        db.close((err) => {
            if (err) return onErrorHandler(err)
        })
    }

}

function init() {
    getTables((err, tables) => {
        if (err) return onErrorHandler(err)
        if (tables.length > 0) {
            console.log('Database is OK.')
            return
        }
        createSchema((err) => {
            if (err) {
                console.error('Database error.', err)
                return onErrorHandler(err)
            }
            console.log('Database is ready.')
        })
    })
}


function getTables(callback) {
    db.all("select name from sqlite_master where type='table'", callback)
}

function createSchema(callback) {
    console.log('Create schema')
    const schemaFile = path.join(__dirname, 'schema.sql')
    load(schemaFile, (err) => {
        if (err) return callback(err)
        const dataFile = path.join(__dirname, 'demodata.sql')
        load(dataFile, callback)
    });
}

function load(file, callback) {
    console.log('Load file: ', file)

    const dataSql = fs.readFileSync(file).toString()
    const dataArr = dataSql.toString().split(";")

    db.serialize(() => {
        db.run("PRAGMA foreign_keys=OFF;")
        db.run("BEGIN TRANSACTION;")
        try {
            dataArr.forEach(query => {
                if (query && query.length > 2) {
                    query += ";"
                    console.log('>', query)
                    db.run(query, err => {
                        if (err) throw err
                    });
                }
            });
            db.run("COMMIT;")
        } catch (err) {
            callback(err)
        }
        callback()
    });
}
