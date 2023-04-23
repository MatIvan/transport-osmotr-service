//@ts-check
'use strict'
const path = require('path');
global.appRoot = path.resolve(__dirname);

const PROPS = require('./properties');

const { app } = require('electron');
if (require('electron-squirrel-startup')) app.quit();

global.version = app.getVersion();
console.log("Start app version=" + global.version);

const events = require('./src/local-events');
const dbService = require('./src/db/db-service');
const controller = require('./src/controller');
const contextMenu = require('electron-context-menu')

controller.bind();

app.whenReady().then(() => {
    PROPS.load(() => {
        events.emit(events.APP.READY);
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        dbService.close();
        app.quit();
    }
});

app.on('web-contents-created', (event, contents) => {
    contents.on('will-navigate', (event, navigationUrl) => {
        event.preventDefault();
    });
    contextMenu({
        window: contents,
        showInspectElement: false,
        showSearchWithGoogle: false,
        showLearnSpelling: false,
    });
});
