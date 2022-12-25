'use strict';
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('versions', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
    // we can also expose variables, not just functions
})

contextBridge.exposeInMainWorld('service', {
    ping: () => ipcRenderer.invoke('ping'),
    setTitle: (title) => ipcRenderer.send('set-title', title),
    openFile: () => ipcRenderer.invoke('dialog:openFile'),
    handleCounter: (callback) => ipcRenderer.on('update-counter', callback),
})
