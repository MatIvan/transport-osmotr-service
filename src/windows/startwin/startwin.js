//@ts-check
'use strict'
const AbstractWin = require('../abstract-win');
const pages = require('../../pages');
const Menu = require('./startwin-menu');

const props = {
    width: 800,
    height: 600,
}

class StartWindow extends AbstractWin {
    constructor() {
        super({ name: 'startwin', props });
        this.setMenu(Menu.menu);
        Menu.setHandler(this);
    }

    onReturnToMainPage(menuItem, browserWindow, event) {
        browserWindow.loadFile(pages.startPage);
    }

    onEditTs(menuItem, browserWindow, event) {
        browserWindow.loadFile(pages.editTs);
    }
}

module.exports = StartWindow
