//@ts-check
'use strict';

const { fillList, bindUpperValue, markAsBad } = require('../elementsUtil');
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
    },

    tsEngineType: (data) => {
        fillList(ELEM.ts.engine_type, data);
    },

    ownerType: (data) => {
        fillList(ELEM.owner.type, data);
    },

    docType: (data) => {
        fillList(ELEM.doc.type, data);
    },

});

prepareElements();
loadLists();

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

    //year
    refreshYear();
    ELEM.ts.year.onchange = refreshYear;
    ELEM.ts.year.onkeyup = refreshYear;

    //vin
    refreshVin();
    bindUpperValue(ELEM.ts.vin);
    ELEM.ts.vin.onchange = refreshVin;
    ELEM.ts.vin.onkeyup = refreshVin;
    ELEM.ts.no_vin.onclick = () => {
        if (ELEM.ts.no_vin.checked) {
            ELEM.ts.vin.value = '';
        }
        refreshVin();
    }

    //chassis + body
    bindUpperValue(ELEM.ts.chassis);
    bindUpperValue(ELEM.ts.body);
    ELEM.ts.btnBodyCopyVin.onclick = () => {
        ELEM.ts.body.value = ELEM.ts.vin.value;
    }

    //category + type
    ELEM.ts.ts_category.onchange = () => {
        RPC.getAtsType(ELEM.ts.ts_category.value);
    }

    //FIO
    bindUpperValue(ELEM.owner.first_name);
    bindUpperValue(ELEM.owner.second_name);
    bindUpperValue(ELEM.owner.midle_name);

    //doc
    ELEM.doc.issuer.value = 'Код ГИБДД ';
    ELEM.doc.type.onchange = refreshDocFullName;
    ELEM.doc.type.onkeyup = refreshDocFullName;
    ELEM.doc.series.onchange = refreshDocFullName;
    ELEM.doc.series.onkeyup = refreshDocFullName;
    ELEM.doc.number.onchange = refreshDocFullName;
    ELEM.doc.number.onkeyup = refreshDocFullName;
    ELEM.doc.issuer.onchange = refreshDocFullName;
    ELEM.doc.issuer.onkeyup = refreshDocFullName;
    ELEM.doc.date.onchange = refreshDocFullName;
    ELEM.doc.date.onkeyup = refreshDocFullName;
}

function loadLists() {
    RPC.getTsCategory();
    RPC.getTsEngineType();
    RPC.getOwnerType();
    RPC.getDocType();
}

function refreshPlate() {
    ELEM.ts.no_grz.checked = !ELEM.ts.plate.value;
}

function refreshBrandModel() {
    ELEM.ts.brandModel.innerText = ELEM.ts.brand.value + ' ' + ELEM.ts.model.value;
}

function refreshYear() {
    const val = Number(ELEM.ts.year.value);
    markAsBad(ELEM.ts.year, val < 1900 || val > 2099);
    refreshVin();
}

function refreshVin() {
    ELEM.ts.no_vin.checked = !ELEM.ts.vin.value;
    const isValid = ELEM.ts.no_vin.checked || validateVin(ELEM.ts.vin.value, Number(ELEM.ts.year.value));
    markAsBad(ELEM.ts.vin, !isValid);
}

function validateVin(vin, date) {
    if (date > 1980) {
        var re = new RegExp("^[A-HJ-NPR-Z\\d]{8}[\\dX][A-HJ-NPR-Z\\d]{2}\\d{6}$");
        return vin.match(re);
    } else {
        //Pre validation are rules to complex. We are forced to assume the vin is valid.
        //Though really at least a simple test would be preferable - eg vin.length >= 20 or whatever
        return true;
    }
}

function refreshDocFullName() {
    const docType = ELEM.doc.type.options[ELEM.doc.type.selectedIndex].text;
    ELEM.doc.full.innerText = docType + ' '
        + ELEM.doc.series.value + ' '
        + ELEM.doc.number.value + ', '
        + ELEM.doc.issuer.value + ', '
        + ELEM.doc.date.value
}