//@ts-check
'use strict'
const { ipcMain } = require('electron');
const Startwin = require('./windows/startwin/startwin');
const dbService = require('./db/db-service');
const events = require('./local-events');
const pages = require('./pages');

/**
 * @type {Startwin}
 */
var startwin;

/**
 * Handle evets from main process
 */
module.exports.bind = () => {
    events.on(events.APP.READY, onAppReady);
    events.on(events.DB.OPEN, onDBReady);
    events.on(events.DB.ERROR, onDBError);
}

/**
 * Handle events from renderer
 */
ipcMain.on(events.TO_MAIN.WIN_startpage.READY, () => {
    dbService.open();
})

ipcMain.on(events.TO_MAIN.DB.GET_CARS, () => {
    dbService.cars((cars) => {
        startwin.webContents.send(events.TO_CLI.DB.CARS, cars);
    });
})
// ipcMain.handle('ping', handlePing) //response


/**
 *  Handlers
 */
function onAppReady() {
    startwin = new Startwin();
    startwin.loadFile(pages.startPage);
}

function onDBReady() {
    startwin.webContents.send(events.TO_CLI.READY);
}

function onDBError(err) {
    const msg = "DB ERROR: " + err.message;
    startwin.webContents.send(events.TO_CLI.ERROR, msg);
}
