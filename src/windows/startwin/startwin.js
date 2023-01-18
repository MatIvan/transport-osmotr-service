//@ts-check
'use strict'
const AbstractWin = require('../abstract-win');
const Menu = require('./startwin-menu');

const props = {
    width: 800,
    height: 600,
}

class StartpageWindow extends AbstractWin {
    constructor() {
        super({ name: 'startpage', props });
        this.setMenu(Menu.menu);
        Menu.setHandler(this);
    }

    onReturnToMainPage() {
        console.log('onReturnToMainPage');
    }
}

module.exports = StartpageWindow
