'use strict'

const { Menu } = require("electron");

let onClickHandler;

function onClick(menuItem, browserWindow, event) {
    const func = onClickHandler[menuItem.id];
    if (typeof func === "function") {
        console.log("onMuneClick: ", menuItem.id);
        func(menuItem, browserWindow, event);
    }
}

const template = [
    {
        label: "Меню",
        submenu: [
            { id: 'onReturnToMainPage', label: "На главную", click: onClick },
            { role: "quit" }
        ],
    },
    {
        label: "Данные",
        submenu: [
            { id: 'onMenuAddTs', label: "Добавить ТС", click: onClick },
            { id: 'onMenuStaff', label: "Сотрудники", click: onClick },
            { id: 'onMenuPlace', label: "Организации", click: onClick },
        ],
    },
    {
        label: "Zoom",
        submenu: [
            { id: 'onZoom100', label: "100%", click: onClick },
            { id: 'onZoom150', label: "150%", click: onClick },
            { id: 'onZoom200', label: "200%", click: onClick },
        ],
    }
];

module.exports = {
    menu: Menu.buildFromTemplate(template),
    setHandler: (handler) => { onClickHandler = handler },
}
