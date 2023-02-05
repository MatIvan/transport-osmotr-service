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
        ],
    },
    {
        label: "Настройки",
        submenu: [
            { id: 'onMenuStaff', label: "Сотрудники", click: onClick },
            { id: 'onMenuPlace', label: "Организации", click: onClick },
        ],
    }
];

module.exports = {
    menu: Menu.buildFromTemplate(template),
    setHandler: (handler) => { onClickHandler = handler },
}
