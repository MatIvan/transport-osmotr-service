//@ts-check
'use strict'
const { ipcMain } = require('electron');
const MainWin = require('./windows/main-win');
const dbService = require('./db/db-service');
const events = require('./local-events');

/**
 * @type {MainWin}
 */
var mainWin;

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
ipcMain.on(events.TO_MAIN.WIN_MAIN.READY, () => {
    dbService.open();
})

ipcMain.on(events.TO_MAIN.DB.GET_CARS, () => {
    dbService.cars((cars) => {
        mainWin.webContents.send(events.TO_CLI.DB.CARS, cars);
    });
})
// ipcMain.handle('ping', handlePing) //response


/**
 *  Handlers
 */
function onAppReady() {
    mainWin = new MainWin();
}

function onDBReady() {
    mainWin.webContents.send(events.TO_CLI.READY);
}

function onDBError(err) {
    const msg = "DB ERROR: " + err.message;
    mainWin.webContents.send(events.TO_CLI.ERROR, msg);
}
