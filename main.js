'use strict';
const { app, ipcMain } = require('electron');
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
    if (process.platform !== 'darwin') app.quit();
});

app.on('web-contents-created', (event, contents) => {

    //disable navigation
    contents.on('will-navigate', (event, navigationUrl) => {
        event.preventDefault()
    })

    //disable other windows
    contents.setWindowOpenHandler(({ url }) => {
        if (isSafeForExternalOpen(url)) {
            setImmediate(() => {
                shell.openExternal(url)
            })
        }
        return { action: 'deny' }
    })
})

const bind = () => {
    // ipcMain.on('set-title', handleSetTitle)
    // ipcMain.handle('ping', handlePing)
    // ipcMain.handle('dialog:openFile', handleFileOpen)
    // ipcMain.on('counter-value', handleCounterValue)
}
