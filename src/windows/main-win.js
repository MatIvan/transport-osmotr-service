//@ts-check
'use strict'
const Win = require('../win')

class MainWindow extends Win {
    constructor() {
        super({ name: 'main' })
        this.bind()
    }

    bind() {
        this.addListener('ready-to-show', () => {
            console.log('MainWin: ready-to-show');
        })
    }

}

module.exports = MainWindow