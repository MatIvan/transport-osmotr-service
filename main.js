//@ts-check
'use strict'

const { app, ipcMain, BrowserWindow } = require('electron');
if (require('electron-squirrel-startup')) app.quit();
const path = require('path');
global.appRoot = path.resolve(__dirname);

const Win = require('./src/Win')

const createWindow = () => {
    const mainWin = new Win({ name: 'main' });
}

app.whenReady().then(() => {
    //create main window
    createWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });

    //bind handlers
    bind();
})

app.on('window-all-closed', () => {
    //stop app on all closed
    if (process.platform !== 'darwin') {
        db.close()
        app.quit()
    }
});

app.on('web-contents-created', (event, contents) => {
    //disable navigation
    contents.on('will-navigate', (event, navigationUrl) => {
        event.preventDefault()
    })
})

const bind = () => {
    // ipcMain.on('set-title', handleSetTitle)
    // ipcMain.handle('ping', handlePing)
    // ipcMain.handle('dialog:openFile', handleFileOpen)
    // ipcMain.on('counter-value', handleCounterValue)
}


// DataBase experiment
const db = require('./src/db/db')
db.open()
db.cars((data) => {
    console.log('Cars: ', data)
})
