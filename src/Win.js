//@ts-check
'use strict';

const { BrowserWindow } = require('electron');
const path = require('path');

const isDevelopment = process.env.NODE_ENV !== 'production'
const defaultProps = {
    width: 800,
    height: 600,
    show: false
}

class Win extends BrowserWindow {
    constructor({ name, ...windowSettings }) {
        super({
            ...defaultProps,
            ...windowSettings,
            webPreferences: {
                preload: path.join(global.appRoot, 'window', name, name + '-preload.js'),
            },
        })

        if (isDevelopment) {
            this.webContents.openDevTools()
        }

        this.webContents.on('devtools-opened', () => {
            this.focus()
            setImmediate(() => {
                this.focus()
            })
        })

        this.loadFile(path.join(global.appRoot, 'window', name, name + '.html'));

        this.once('ready-to-show', () => {
            this.show();
        })
    }
}

module.exports = Win