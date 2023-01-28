//@ts-check
'use strict';

const { fillList } = require('../elementsUtil');
const RPC = require('../rpc');
const ELEM = require('./elements');

RPC.bind({
    tsForEdit: (data) => {
        if (!data) {
            console.log('Открыто для добавления ТС');
            return;
        }
        ELEM.caption.innerText = 'Редактировать транспортное средство';
    },

    tsCategory: (data) => {
        fillList(ELEM.ts.ts_category, data);
    },

    atsType: (data) => {
        fillList(ELEM.ts.ats_type, data);
    }
});

prepareElements();

RPC.getTsCategory();
RPC.getTsForEdit();

function prepareElements() {
    ELEM.ts.ts_category.onchange = () => {
        RPC.getAtsType(ELEM.ts.ts_category.value);
    }
}
