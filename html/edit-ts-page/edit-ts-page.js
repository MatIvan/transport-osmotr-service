//@ts-check
'use strict';

const { fillList, bindUpperValue } = require('../elementsUtil');
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
    //plate
    refreshPlate();
    bindUpperValue(ELEM.ts.plate);
    ELEM.ts.plate.onchange = refreshPlate;
    ELEM.ts.plate.onkeyup = refreshPlate;
    ELEM.ts.no_grz.onclick = () => {
        if (ELEM.ts.no_grz.checked) {
            ELEM.ts.plate.value = '';
        }
        refreshPlate();
    }

    //brand + model
    bindUpperValue(ELEM.ts.brand);
    bindUpperValue(ELEM.ts.model);
    ELEM.ts.brand.onchange = refreshBrandModel;
    ELEM.ts.model.onchange = refreshBrandModel;
    ELEM.ts.brand.onkeyup = refreshBrandModel;
    ELEM.ts.model.onkeyup = refreshBrandModel;

    ELEM.ts.ts_category.onchange = () => {
        RPC.getAtsType(ELEM.ts.ts_category.value);
    }
}

function refreshPlate() {
    ELEM.ts.no_grz.checked = !ELEM.ts.plate.value;
}

function refreshBrandModel() {
    console.log('MATIV: ', ELEM.ts.brand.value + ' ' + ELEM.ts.model.value);
    ELEM.ts.brandModel.value = ELEM.ts.brand.value + ' ' + ELEM.ts.model.value;
}
