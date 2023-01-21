//@ ts-check
'use strict';

const channels = require('../channels');
const ui = require('../ui');

const HANDLER = {
    tsForEdit: (data) => {
        if (!data) {
            console.log('Открыто для добавления ТС');
            return;
        }
        document.getElementById('caption').innerText = 'Редактировать транспортное средство';

    },

    tsCategory: (data) => {
        ui.fillList('ts.ts_category', data);
    },

    atsType: (data) => {
        ui.fillList('ts.ats_type', data);
    }
}

channels.bind(channels.MAIN, HANDLER);
channels.bind(channels.DB, HANDLER);

document.getElementById('ts.ts_category').onchange = () => {
    const v = document.getElementById('ts.ts_category').value;
    channels.sendToDataBaseChannel('getAtsType', v);
}

channels.sendToDataBaseChannel('getTsCategory');
channels.sendToMainChannel('getTsForEdit');
