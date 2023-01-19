//@ts-check
'use strict'

const { contextBridge, ipcRenderer } = require('electron');

const MAIN_CHANNEL = 'main-channel';
const DATABASE_CHANNEL = 'database-channel';

contextBridge.exposeInMainWorld('versions', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
});

contextBridge.exposeInMainWorld('service', {
    sendToMainChannel: (cmd, params) => ipcRenderer.send(MAIN_CHANNEL, cmd, params),
    sendToDataBaseChannel: (cmd, params) => ipcRenderer.send(DATABASE_CHANNEL, cmd, params)
});

contextBridge.exposeInMainWorld('handlers', {
    onMainChannel: (callback) => ipcRenderer.on(MAIN_CHANNEL, wrap(callback)),
    onDatabaseChannel: (callback) => ipcRenderer.on(DATABASE_CHANNEL, wrap(callback)),
});

function wrap(callback) {
    return (event, cmd, data) => { callback(cmd, data) }
}