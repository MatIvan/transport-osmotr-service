//@ts-check
'use strict'

const { Menu, MenuItem } = require('electron');

const menu = new Menu();
menu.append(new MenuItem({
    label: 'copy',
    click: () => { exec('copy'); }
}));
menu.append(new MenuItem({
    label: 'paste',
    click: () => { exec('paste'); }
}));

function exec(command) {
    try {
        if (!document.execCommand(command)) {
            console.error("Command not executed: " + command);
        }
    } catch (err) {
        console.error("Unsupported command " + command, err);
    }
}

module.exports = (webContents, params) => {
    console.log(webContents);
    console.log(params);
    menu.popup(webContents);
}
