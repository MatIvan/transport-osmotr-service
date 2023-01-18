'use strict'

const { Menu } = require("electron");

let onClickHandler;

function onClick(menuItem, browserWindow, event) {
    const func = onClickHandler[menuItem.id];
    if (typeof func === "function") {
        func(menuItem, browserWindow, event);
    }
}

const template = [
    {
        label: "Menu",
        submenu: [
            { id:'onReturnToMainPage', label: "На главную", click: onClick },
            { role: "quit" }
        ],
    },
];

module.exports = {
    menu: Menu.buildFromTemplate(template),
    setHandler: (handler) => { onClickHandler = handler },
}
