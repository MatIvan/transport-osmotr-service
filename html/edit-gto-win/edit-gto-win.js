//@ts-check
'use strict';
const { fillList, setChangeHandler } = require('../elementsUtil');
const ALERT_WIN = require('../alert');
const CONFIRM_WIN = require('../confirm');
const COST_UTIL = require('../cost-util');
const VIEW = require('./edit-gto-view.js');

/**
 * @typedef {import('../../src/db/repository/ts-repo').Ts} Ts
 * @typedef {import('../../src/db/repository/gto-repo').Gto} Gto
 * @typedef {import('../../src/db/repository/place-repo').Place} Place
 * @typedef {import('../../src/db/repository/staff-repo').Staff} Staff
 * @typedef {import('../../src/db/repository/types-repo').GtoTestType} GtoTestType
 * @typedef {import('../../src/db/repository/types-repo').GtoResult} GtoResult
 * @typedef {import('../../src/db/repository/types-repo').GtoProcess} GtoProcess
 * @typedef {import('../../src/db/repository/types-repo').GtoPeriod} GtoPeriod
 * @typedef {import('../../src/db/repository/types-repo').GtoCostType} GtoCostType
 */

/**
 * @type {Gto}
 */
var currentGto = emptyGto();

var hasChanged = false;

/**
 * @type {Staff[]}
 */
var allStaffList = [];

/**
 * @type {GtoPeriod[]}
 */
var allPeriodTypeList = [];

/**
 * @type {HTMLElement | null}
 */
var container = null;

var ELEM;

/**
 * @returns {Gto}
 */
function emptyGto() {
    return {
        id: -1,
        ts_id: -1,
        date: new Date().toISOString().substring(0, 10),
        place_id: -1,
        staff_id: -1,
        test_type_id: -1,
        result_id: -1,
        process_id: -1,
        period_id: -1,
        stop_date: '',
        cost: 0,
        cost_type_id: -1
    };
}

/**
 * @param {Gto} gto 
 */
var onSaveHandler = (gto) => { };

/**
 * @param {number} tsId
 * @param {string} tsPlate
 * @param {Gto | null} gto
 */
function show(tsId, tsPlate, gto) {
    if (container) {
        container.classList.remove("hide");
    }
    if (gto) {
        currentGto = JSON.parse(JSON.stringify(gto));//deep copy
    } else {
        currentGto = emptyGto();
    }
    currentGto.ts_id = tsId;
    ELEM.ui.subcaption.innerText = tsPlate;
    refresh();
}

function refresh() {
    refreshStaff();
    ELEM.edit.date.value = currentGto.date;
    ELEM.edit.place_id.value = String(currentGto.place_id);
    ELEM.edit.staff_id.value = String(currentGto.staff_id);
    ELEM.edit.test_type_id.value = String(currentGto.test_type_id);
    ELEM.edit.result_id.value = String(currentGto.result_id);
    ELEM.edit.process_id.value = String(currentGto.process_id);
    ELEM.edit.period_id.value = String(currentGto.period_id);
    ELEM.edit.stop_date.value = currentGto.stop_date;
    ELEM.edit.cost.value = COST_UTIL.toString(currentGto.cost);
    ELEM.edit.cost_type_id.value = String(currentGto.cost_type_id);
    COST_UTIL.valid(ELEM.edit.cost, currentGto.cost);
    refreshUiState();
}

function refreshUiState() {
    if (hasChanged) {
        ELEM.ui.btnEditSave.removeAttribute('disabled');
    } else {
        ELEM.ui.btnEditSave.setAttribute('disabled', "true");
    }
}

function hide() {
    hasChanged = false;
    currentGto = emptyGto();
    refresh();
    if (container) {
        container.classList.add("hide");
    }
}

/**
 * @param {HTMLElement} winContainer
 */
function bind(winContainer) {
    container = winContainer;
    container.innerHTML = VIEW.HTML;
    ELEM = VIEW.init();

    ELEM.ui.btnEditCancel.onclick = () => {
        if (!hasChanged) {
            hide();
            return;
        }
        CONFIRM_WIN.show('Данные будут потеряны!<br>Выйти?', () => {
            hide();
        });
    }
    ELEM.ui.btnEditSave.onclick = () => {
        if (!hasChanged) {
            ALERT_WIN.show('Изменений нет.');
            return;
        }
        onSaveHandler(JSON.parse(JSON.stringify(currentGto)));//deep copy
        hide();
    }

    setChangeHandler(ELEM.edit.date, () => {
        hasChanged = true;
        currentGto.date = ELEM.edit.date.value;
        refreshUiState();
    });

    setChangeHandler(ELEM.edit.place_id, () => {
        hasChanged = true;
        currentGto.place_id = Number(ELEM.edit.place_id.value);
        refreshStaff();
        refreshUiState();
    });

    setChangeHandler(ELEM.edit.staff_id, () => {
        hasChanged = true;
        currentGto.staff_id = Number(ELEM.edit.staff_id.value);
        refreshUiState();
    });

    setChangeHandler(ELEM.edit.test_type_id, () => {
        hasChanged = true;
        currentGto.test_type_id = Number(ELEM.edit.test_type_id.value);
        refreshUiState();
    });

    setChangeHandler(ELEM.edit.result_id, () => {
        hasChanged = true;
        currentGto.result_id = Number(ELEM.edit.result_id.value);
        refreshUiState();
    });

    setChangeHandler(ELEM.edit.process_id, () => {
        hasChanged = true;
        currentGto.process_id = Number(ELEM.edit.process_id.value);
        refreshUiState();
    });

    setChangeHandler(ELEM.edit.period_id, () => {
        hasChanged = true;
        currentGto.period_id = Number(ELEM.edit.period_id.value);

        const months = allPeriodTypeList.find(per => per.id === currentGto.period_id)?.months || 0;
        const start = new Date(currentGto.date);
        const stop = new Date(start.setMonth(start.getMonth() + months));
        currentGto.stop_date = stop.toISOString().substring(0, 10);
        ELEM.edit.stop_date.value = currentGto.stop_date;

        refreshUiState();
    });

    setChangeHandler(ELEM.edit.stop_date, () => {
        hasChanged = true;
        currentGto.stop_date = ELEM.edit.stop_date.value;
        refreshUiState();
    });

    setChangeHandler(ELEM.edit.cost, () => {
        hasChanged = true;
        COST_UTIL.normalize(ELEM.edit.cost);
        currentGto.cost = COST_UTIL.parse(ELEM.edit.cost);
        COST_UTIL.valid(ELEM.edit.cost, currentGto.cost);
        refreshUiState();
    });

    setChangeHandler(ELEM.edit.cost_type_id, () => {
        hasChanged = true;
        currentGto.cost_type_id = Number(ELEM.edit.cost_type_id.value);
        refreshUiState();
    });
}

function refreshStaff() {
    let staffList = [];
    if (allStaffList.length !== 0 && currentGto.place_id > 0) {
        staffList = allStaffList
            .filter(staff => {
                return (staff.place_id === currentGto.place_id) && staff.active
            })
            .map(staff => {
                return {
                    id: staff.id,
                    name: staff.full_name
                };
            });
    }
    fillList(ELEM.edit.staff_id, staffList);
    ELEM.edit.staff_id.value = String(currentGto.staff_id);
}

module.exports = {
    bind: bind,
    show: show,
    onSave: (/** @type {(gto: Gto) => void} */ handler) => onSaveHandler = handler,

    /**
     * @param {Place[]} placeArray
     */
    setPlaceList: (placeArray) => {
        const placeList = placeArray.map(place => {
            return {
                id: place.id,
                name: place.name + ' ' + place.address
            };
        });
        fillList(ELEM.edit.place_id, placeList);
        refreshStaff();
    },

    /**
     * @param {Staff[]} staffArray
     */
    setStaffList: (staffArray) => {
        allStaffList = staffArray;
        refreshStaff();
    },

    /**
     * @param {GtoTestType[]} testTypeArray
     */
    setTestTypeList: (testTypeArray) => {
        fillList(ELEM.edit.test_type_id, testTypeArray);
    },

    /**
     * @param {GtoResult[]} resultTypeArray
     */
    setResultTypeList: (resultTypeArray) => {
        fillList(ELEM.edit.result_id, resultTypeArray);
    },

    /**
     * @param {GtoProcess[]} processTypeArray
     */
    setProcessTypeList: (processTypeArray) => {
        fillList(ELEM.edit.process_id, processTypeArray);
    },

    /**
     * @param {GtoPeriod[]} periodTypeArray
     */
    setPeriodTypeList: (periodTypeArray) => {
        allPeriodTypeList = periodTypeArray;
        fillList(ELEM.edit.period_id, allPeriodTypeList);
    },

    /**
     * @param {GtoCostType[]} costTypeArray
     */
    setCostTypeList: (costTypeArray) => {
        fillList(ELEM.edit.cost_type_id, costTypeArray);
    },
}
