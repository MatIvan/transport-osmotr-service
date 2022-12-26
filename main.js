//@ts-check
'use strict'

const { app, ipcMain, BrowserWindow } = require('electron');
if (require('electron-squirrel-startup')) app.quit();

const path = require('path');
const events = require('./src/local-events')
const db = require('./src/db/db')
const controller = require('./src/controller')

global.appRoot = path.resolve(__dirname);

controller.bind()

app.whenReady().then(() => {
    events.emit(events.APP.READY)
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        db.close()
        app.quit()
    }
});

app.on('web-contents-created', (event, contents) => {
    contents.on('will-navigate', (event, navigationUrl) => {
        event.preventDefault()
    })
})
