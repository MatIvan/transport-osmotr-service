//@ts-check
'use strict'
const { ipcMain } = require('electron');
const MainWin = require('./windows/main-win')
const db = require('./db/db')
const events = require('./local-events')

/**
 * @type {MainWin}
 */
var mainWin

module.exports.bind = () => {
    events.on(events.APP.READY, onAppReady)
    events.on(events.DB.OPEN, onDBReady)
    events.on(events.DB.ERROR, onDBError)
}

// Bind IPC
ipcMain.on('main-win-ready', () => { db.open() })
// ipcMain.handle('ping', handlePing) //response


// Handlers

function onAppReady() {
    mainWin = new MainWin()
}

function onDBReady() {
    mainWin.webContents.send(events.CLI.READY)
}

function onDBError(err) {
    const msg = "DB ERROR: " + err.message
    mainWin.webContents.send(events.CLI.ERROR, msg)
}
