//@ts-check
'use strict';

const { BrowserWindow } = require('electron');
const path = require('path');

const isDevelopment = (process.env.NODE_ENV?.trim() === "dev");
const defaultProps = {
    show: false,
    //secrity
    nodeIntegration: false,
    contextIsolation: true,
    enableRemoteModule: false
}

function getPreloaderPath(name) {
    return path.join(global.appRoot, 'src', 'windows', name, name + '-preload.js');
}

class AbstractWin extends BrowserWindow {
    constructor({ name, ...windowSettings }) {
        super({
            ...defaultProps,
            ...windowSettings,
            webPreferences: {
                preload: getPreloaderPath(name),
            },
        })

        if (isDevelopment) {
            this.webContents.openDevTools();
        }

        this.webContents.on('devtools-opened', () => {
            this.focus()
            setImmediate(() => {
                this.focus()
            })
        })

        this.once('ready-to-show', () => {
            this.show();
        })
    }
}

module.exports = AbstractWin