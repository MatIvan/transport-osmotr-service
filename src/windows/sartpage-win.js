//@ts-check
'use strict'
const Win = require('../win')

class StartpageWindow extends Win {
    constructor() {
        super({ name: 'startpage' })
        this.bind()
    }

    bind() {
        this.addListener('ready-to-show', () => {
            console.log('startpageWin: ready-to-show');
        })
    }

}

module.exports = StartpageWindow