//@ts-check
'use strict'
const AbstractWin = require('../abstract-win');
const pages = require('../../pages');
const Menu = require('./startwin-menu');
const { BrowserWindow } = require('electron');

class StartWindow extends AbstractWin {
    constructor() {
        super({ name: 'startwin' });
        this.setMenu(Menu.menu);
        Menu.setHandler(this);
    }

    onReturnToMainPage(menuItem, browserWindow, event) {
        browserWindow.loadFile(pages.startPage);
    }

    onMenuAddTs(menuItem, browserWindow, event) {
        browserWindow.loadFile(pages.editTs);
    }

    onMenuStaff(menuItem, browserWindow, event) {
        browserWindow.loadFile(pages.staff);
    }

    onMenuPlace(menuItem, browserWindow, event) {
        browserWindow.loadFile(pages.place);
    }

    onMenuAddGto(menuItem, browserWindow, event) {
        browserWindow.loadFile(pages.editGto);
    }

    onZoom100(menuItem, browserWindow, event) {
        browserWindow.webContents.setZoomFactor(1.0);
    }

    onZoom150(menuItem, browserWindow, event) {
        browserWindow.webContents.setZoomFactor(1.5);
    }

    onZoom200(menuItem, browserWindow, event) {
        browserWindow.webContents.setZoomFactor(2.0);
    }
}

module.exports = StartWindow
