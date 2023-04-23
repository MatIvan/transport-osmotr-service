//@ts-check
'use strict';

const RPC = require('../rpc');
const ELEM = require('./elements');
const VIEW = require('./edit-ts-page-view');
const WAIT_WIN = require('../wait-win');
const ALERT_WIN = require('../alert');
const CONFIRM_WIN = require('../confirm');
const VALIDATOR = require('./edit-ts-validator');

/**
 * @typedef {import('../../src/db/repository/types-repo').Ats_Type} Ats_Type
 * @typedef {import('../../src/db/repository/types-repo').Ts_Category} Ts_Category
 * @typedef {import('../../src/db/repository/types-repo').Engine_Type} Engine_Type
 * @typedef {import('../../src/db/repository/types-repo').Owner_Type} Owner_Type
 * @typedef {import('../../src/db/repository/types-repo').Ts_Doc_Type} Ts_Doc_Type
 * @typedef {import('../../src/db/repository/ts-repo').Ts} Ts
 * @typedef {import('../../src/db/repository/doc-repo').Doc} Doc
 * @typedef {import('../../src/db/repository/owner-repo').Owner} Owner
 * @typedef {import('../../src/handlers/main-channel-handler').TsBeanForEdit} TsBeanForEdit
 */

var hasChanged = false;

/**
 * @type Ts
 */
var currentTs = getEmptyTs();

function getEmptyTs() {
    return {
        id: -1,
        doc: {
            id: -1,
            ts_doc_type_id: -1,
            series: '',
            number: '',
            issuer: 'Код ГИБДД: ',
            date: '',
        },
        owner: {
            id: -1,
            first_name: '',
            second_name: '',
            midle_name: '',
            owner_type_id: -1,
        },
        plate: '',
        no_grz: true,
        brand: '',
        model: '',
        year: 1900,
        vin: '',
        no_vin: true,
        chassis: '',
        body: '',
        ts_category_id: -1,
        ats_type_id: -1,
        engine_type_id: -1,
        odometer: 0,
    };
}

WAIT_WIN.show();

RPC.bind({
    /**
     * @param {string} msg
     */
    databaseError: (msg) => {
        ALERT_WIN.show('ОШИБКА !!!<br><br>' + msg);
        WAIT_WIN.hide();
    },

    /**
     * @param {Ts | TsBeanForEdit} ts 
     */
    tsForEdit: (ts) => {
        if (!ts) {
            ALERT_WIN.show('Шобика загрузки ТС !');
            return;
        }
        if (ts.id > 0) {
            // @ts-ignore
            currentTs = ts;
        } else {
            currentTs = getEmptyTs();
            currentTs.plate = ts.plate
            currentTs.no_grz = !currentTs.plate;
        }
        refreshAll();
        WAIT_WIN.hide();
    },

    /**
     * @param {Ts_Category[]} tsCategoryArray
     */
    tsCategory: (tsCategoryArray) => {
        VIEW.setTsCategoryList(tsCategoryArray);
    },

    /**
     * @param {Ats_Type[]} newAtsTypeArray
     */
    atsType: (newAtsTypeArray) => {
        VIEW.setAtsTypeList(newAtsTypeArray);
    },

    /**
     * @param {Engine_Type[]} engineTypeArray
     */
    tsEngineType: (engineTypeArray) => {
        VIEW.setTsEngineType(engineTypeArray);
    },

    /**
     * @param {Owner_Type[]} ownerTypeArray
     */
    ownerType: (ownerTypeArray) => {
        VIEW.setOwnerTpeList(ownerTypeArray);
    },

    /**
     * @param {Ts_Doc_Type[]} tsDocTypeArray
     */
    docType: (tsDocTypeArray) => {
        VIEW.setDocTypeList(tsDocTypeArray);
    },

    /**
     * @param {Ts} ts
     */
    tsSavedSuccess: (ts) => {
        currentTs = ts;
        hasChanged = false;
        refreshAll();
        WAIT_WIN.hide();
        ALERT_WIN.show('Сохранено успешно!');
        refreshUiState();
    },
});

VIEW.prepareElements();

VIEW.onPlate((newPlate) => {
    currentTs.plate = newPlate;
    currentTs.no_grz = !currentTs.plate;
    hasChanged = true;
    refreshAll();
});

VIEW.onNoGrz((val) => {
    currentTs.no_grz = val;
    if (currentTs.no_grz) {
        currentTs.plate = '';
    }
    hasChanged = true;
    refreshAll();
});

VIEW.onBrand((newBrand) => {
    currentTs.brand = newBrand;
    hasChanged = true;
    refreshAll();
});

VIEW.onModel((newModel) => {
    currentTs.model = newModel;
    hasChanged = true;
    refreshAll();
});

VIEW.onYear((newYear) => {
    currentTs.year = newYear;
    hasChanged = true;
    refreshAll();
});

VIEW.onVin((newVin) => {
    currentTs.vin = newVin;
    currentTs.no_vin = !currentTs.vin;
    hasChanged = true;
    refreshAll();
});

VIEW.onNoVin((val) => {
    currentTs.no_vin = val;
    if (currentTs.no_vin) {
        currentTs.vin = '';
    }
    hasChanged = true;
    refreshAll();
});

VIEW.onChassis((newChassis) => {
    currentTs.chassis = newChassis;
    hasChanged = true;
    refreshAll();
});

VIEW.onBody((newBody) => {
    currentTs.body = newBody;
    hasChanged = true;
    refreshAll();
});

VIEW.onTsCategory((newTsCategory) => {
    currentTs.ts_category_id = newTsCategory;
    currentTs.ats_type_id = -1;
    hasChanged = true;
    refreshAll();
});

VIEW.onAtsType((newAtsType) => {
    currentTs.ats_type_id = newAtsType;
    hasChanged = true;
    refreshAll();
});

VIEW.onEngineType((newVal) => {
    currentTs.engine_type_id = newVal;
    hasChanged = true;
    refreshAll();
});

VIEW.onOdometer((newVal) => {
    currentTs.odometer = newVal;
    hasChanged = true;
    refreshAll();
});

VIEW.onOwnerType((newVal) => {
    currentTs.owner.owner_type_id = newVal;
    hasChanged = true;
    refreshAll();
});

VIEW.onFirstName((newFirstName) => {
    currentTs.owner.first_name = newFirstName;
    hasChanged = true;
    refreshAll();
});

VIEW.onSecondName((newSecondName) => {
    currentTs.owner.second_name = newSecondName;
    hasChanged = true;
    refreshAll();
});

VIEW.onMidleName((newMidleName) => {
    currentTs.owner.midle_name = newMidleName;
    hasChanged = true;
    refreshAll();
});

VIEW.onDocType((newVal) => {
    currentTs.doc.ts_doc_type_id = newVal;
    hasChanged = true;
    refreshAll();
});

VIEW.onDocSeries((newVal) => {
    currentTs.doc.series = newVal;
    hasChanged = true;
    refreshAll();
});

VIEW.onDocNumber((newVal) => {
    currentTs.doc.number = newVal;
    hasChanged = true;
    refreshAll();
});

VIEW.onDocIssuer((newVal) => {
    currentTs.doc.issuer = newVal;
    hasChanged = true;
    refreshAll();
});

VIEW.onDocDate((newVal) => {
    currentTs.doc.date = newVal;
    hasChanged = true;
    refreshAll();
});

loadLists();

ELEM.ui.btnSave.onclick = save;
ELEM.ui.btnCancel.onclick = () => {
    if (!hasChanged) {
        RPC.showStartPage();
        return;
    }
    CONFIRM_WIN.show('Данные будут потеряны!<br>Выйти?', () => {
        RPC.showStartPage();
    });
}
ELEM.ui.btnGtoList.onclick = () => {
    if (currentTs.id > 0) {
        RPC.onGtoListForTs(currentTs.id);
    } else {
        ALERT_WIN.show('Необходимо сохранить ТС.');
    }
}

RPC.getTsForEdit();

function refreshAll() {
    VIEW.refreshAll(currentTs);
    refreshUiState();
}

function loadLists() {
    RPC.getTsCategory();
    RPC.getTsEngineType();
    RPC.getOwnerType();
    RPC.getDocType();
    RPC.getAtsType();
}

function save() {
    if (!hasChanged) {
        ALERT_WIN.show('Изменений нет.');
        return;
    }
    WAIT_WIN.show();
    RPC.saveTs(currentTs);
}

function refreshUiState() {
    setDisabled(ELEM.ui.btnSave, hasChanged);
    setDisabled(ELEM.ui.btnSave, !VALIDATOR.all(currentTs));
    setDisabled(ELEM.ui.btnGtoList, (currentTs.id < 1));
}

/**
 * @param {HTMLElement} element
 * @param {boolean} isDisabled
 */
function setDisabled(element, isDisabled) {
    if (isDisabled) {
        element.setAttribute('disabled', "true");
    } else {
        element.removeAttribute('disabled');
    }
}