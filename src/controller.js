//@ts-check
'use strict'

const { ipcMain } = require('electron');
const Startwin = require('./windows/startwin/startwin');
const events = require('./local-events');
const pages = require('./pages');
const MainChannelHandler = require('./handlers/main-channel-handler');
const DataBaseChannelHandler = require('./handlers/database-channel-handler');

var startwin;

module.exports.windows = {
    startwin: () => { return startwin },
}

/**
 * Handle evets from main chanel
 */
module.exports.bind = () => {
    events.on(events.APP.READY, onAppReady);
    events.on(events.DB.OPEN, onDBReady);
    events.on(events.DB.ERROR, onDBError);
}

/**
 * Handle events from renderer
 */

bind(MainChannelHandler);
bind(DataBaseChannelHandler);

function bind(handler) {
    const handlerName = handler.name;
    ipcMain.on(handlerName, (event, cmd, params) => {
        console.log(`invoke ${handlerName}: cmd=${cmd}, params=${params} `);
        const func = handler[cmd];
        if (typeof func !== 'function') {
            console.warn('Unknown command = ', cmd);
            return;
        }
        const callback = (cmd, data) => { event.sender.send(handlerName, cmd, data) };
        func(params, callback);
    });
}

/**
 *  Handlers
 */
function onAppReady() {
    startwin = new Startwin();
    startwin.loadFile(pages.startPage);
}

function onDBReady() {
    const cmd = 'databaseReady';
    startwin.webContents.send(DataBaseChannelHandler.name, cmd);
}

function onDBError(err) {
    const cmd = 'databaseError';
    const msg = err.message;
    startwin.webContents.send(DataBaseChannelHandler.name, cmd, msg);
}
