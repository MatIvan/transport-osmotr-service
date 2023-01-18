//@ts-check
'use strict'

const { contextBridge, ipcRenderer } = require('electron');



contextBridge.exposeInMainWorld('versions', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
    // we can also expose variables, not just functions
});

/**
 * Commands from renderer to startpage
 */
contextBridge.exposeInMainWorld('service', {
    ready: () => ipcRenderer.send('startpage-win-ready'),
    db: {
        getCars: () => ipcRenderer.send('db-get-cars'),
    },
    // ping: () => ipcRenderer.invoke('ping'),
    // setTitle: (title) => ipcRenderer.send('set-title', title),
});


//TODO: How to import ../../src/local-events.js ???
/**
 * Bind events from main process to client renderer
 * See local-events.js
 */
contextBridge.exposeInMainWorld('handlers', {
    onReady: (callback) => ipcRenderer.on('to-cli-ready', callback),
    onError: (callback) => ipcRenderer.on('to-cli-error', callback),
    db: {
        onCars: (callback) => ipcRenderer.on('to-cli-db-cars', callback),
    }
});
