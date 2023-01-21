//@ ts-check
'use strict';

const channels = require('../channels');

const HANDLER = {
    tsForEdit: (data) => {
        if (!data) {
            console.log('Открыто для добавления ТС');
            return;
        }
        document.getElementById('caption').innerText = 'Редактировать транспортное средство';

    }
}

channels.bind(channels.MAIN, HANDLER);
channels.bind(channels.DB, HANDLER);

// @ts-ignore
window.service.sendToMainChannel('getTsForEdit');
