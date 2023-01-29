//@ts-check
'use strict';

const { fillList, bindUpperValue, markAsBad } = require('../elementsUtil');
const RPC = require('../rpc');
const ELEM = require('./elements');

/**
 * @typedef {import('../../src/db/db-service').Ats_Type} Ats_Type
 * @typedef {import('../../src/db/db-service').Ts_Category} Ts_Category
 * @typedef {import('../../src/db/db-service').Engine_Type} Engine_Type
 * @typedef {import('../../src/db/db-service').Owner_Type} Owner_Type
 * @typedef {import('../../src/db/db-service').Ts_Doc_Type} Ts_Doc_Type
 * @typedef {import('../../src/db/db-service').Ts} Ts
 * @typedef {import('../../src/db/db-service').TS_Doc} TS_Doc
 * @typedef {import('../../src/db/db-service').Owner} Owner
 */

var hasChanged = false;

RPC.bind({
    /**
     * @param {string} msg 
     */
    databaseError: (msg) => {
        alert('ОШИБКА !!!\n\n' + msg);
    },

    /**
     * @param {Ts} ts 
     */
    tsForEdit: (ts) => {
        if (!ts) {
            console.log('Открыто для добавления ТС');
            return;
        }
        ELEM.ui.caption.innerText = 'Редактировать транспортное средство';
    },

    /**
     * @param {Ts_Category[]} tsCategoryArray
     */
    tsCategory: (tsCategoryArray) => {
        fillList(ELEM.ts.ts_category, tsCategoryArray);
    },

    /**
     * @param {Ats_Type[]} atsTypeArray
     */
    atsType: (atsTypeArray) => {
        fillList(ELEM.ts.ats_type, atsTypeArray);
    },

    /**
     * @param {Engine_Type[]} engineTypeArray
     */
    tsEngineType: (engineTypeArray) => {
        fillList(ELEM.ts.engine_type, engineTypeArray);
    },

    /**
     * @param {Owner_Type[]} ownerTypeArray
     */
    ownerType: (ownerTypeArray) => {
        fillList(ELEM.owner.type, ownerTypeArray);
    },

    /**
     * @param {Ts_Doc_Type[]} tsDocTypeArray
     */
    docType: (tsDocTypeArray) => {
        fillList(ELEM.doc.type, tsDocTypeArray);
    },

    /**
     * @param {number} tsId
     */
    tsSavedSuccess: (tsId) => {
        console.log('tsSavedSuccess: ' + tsId);
        alert('Сохранено успешно!');
    }
});

prepareElements();
bindHasChanged(ELEM.ts);
bindHasChanged(ELEM.owner);
bindHasChanged(ELEM.doc);
loadLists();

ELEM.ui.btnSave.onclick = save;
ELEM.ui.btnCancel.onclick = () => {
    if (!hasChanged || confirm('Данные будут потеряны!\nВыйти?')) {
        RPC.showStartPage();
    }
}

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
        RPC.getAtsType(valueOrNull(ELEM.ts.ts_category.value));
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

/**
 * @param {Object} object - object whos fields id HTMLElements
 */
function bindHasChanged(object) {
    for (let elem in object) {
        object[elem].addEventListener('change', () => {
            hasChanged = true;
        });
    }
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

/**
 * @param {string} vin 
 * @param {number} year 
 */
function validateVin(vin, year) {
    if (year > 1980) {
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

function save() {
    /** @type Ts */
    const ts = {
        id: -1,
        ts_doc_id: -1,
        owner_id: -1,
        doc: {
            id: -1,
            ts_doc_type_id: valueOrNull(ELEM.doc.type.value),
            series: valueOrNull(ELEM.doc.series.value),
            number: valueOrNull(ELEM.doc.number.value),
            issuer: valueOrNull(ELEM.doc.issuer.value),
            date: valueOrNull(ELEM.doc.date.value),
        },
        owner: {
            id: -1,
            first_name: valueOrNull(ELEM.owner.first_name.value),
            second_name: valueOrNull(ELEM.owner.second_name.value),
            midle_name: valueOrNull(ELEM.owner.midle_name.value),
            owner_type_id: valueOrNull(ELEM.owner.type.value),
        },
        plate: valueOrNull(ELEM.ts.plate.value),
        no_grz: ELEM.ts.no_grz.checked,
        brand: valueOrNull(ELEM.ts.brand.value),
        model: valueOrNull(ELEM.ts.model.value),
        year: valueOrNull(ELEM.ts.year.value),
        vin: valueOrNull(ELEM.ts.vin.value),
        no_vin: ELEM.ts.no_vin.checked,
        chassis: valueOrNull(ELEM.ts.chassis.value),
        body: valueOrNull(ELEM.ts.body.value),
        ts_category_id: valueOrNull(ELEM.ts.ts_category.value),
        ats_type_id: valueOrNull(ELEM.ts.ats_type.value),
        engine_type_id: valueOrNull(ELEM.ts.engine_type.value),
        odometer: valueOrNull(ELEM.ts.odometer.value),
    };
    RPC.saveTs(ts);
}

/**
 * @param {any} val
 * @returns any
 */
function valueOrNull(val) {
    if (!val) {
        return null;
    }
    return val;
}
