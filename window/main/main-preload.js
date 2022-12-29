//@ts-check
'use strict'

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('versions', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
    // we can also expose variables, not just functions
});

contextBridge.exposeInMainWorld('service', {
    ready: () => ipcRenderer.send('main-win-ready'),
    // ping: () => ipcRenderer.invoke('ping'),
    // setTitle: (title) => ipcRenderer.send('set-title', title),
});

contextBridge.exposeInMainWorld('handlers', {
    onReady: (callback) => ipcRenderer.on('cli-ready', callback),
    onError: (callback) => ipcRenderer.on('cli-error', callback),
});
