//@ts-check
'use strict';
const { fillList, setChangeHandler } = require('../elementsUtil');
const ELEM = require('./elements');

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
 * @returns {Gto}
 */
function emptyGto() {
    return {
        id: -1,
        ts_id: -1,
        date: '',
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
 * @param {Gto | null} gto
 */
function show(gto) {
    ELEM.editLay.classList.remove("hide");
    currentGto = gto || emptyGto();
    MATIV
    ELEM.edit.fullName.value = currentGto.full_name;
    ELEM.edit.code.value = currentGto.code;
    ELEM.edit.place.value = String(currentGto.place_id);
    ELEM.edit.active.checked = currentGto.active;
}

function hide() {
    hasChanged = false;
    currentGto = emptyGto();
    ELEM.editLay.classList.add("hide");
}

function bind() {
    ELEM.ui.btnEditCancel.onclick = () => {
        if (!hasChanged || confirm('Данные будут потеряны!\nВыйти?')) {
            hide();
        }
    }
    ELEM.ui.btnEditSave.onclick = () => {
        if (!hasChanged) {
            alert('Изменений нет.');
            return;
        }
        onSaveHandler(JSON.parse(JSON.stringify(currentGto)));//deep copy
        hide();
    }

    setChangeHandler(ELEM.edit.fullName, () => {
        hasChanged = true;
        currentGto.full_name = ELEM.edit.fullName.value;
    });

    setChangeHandler(ELEM.edit.code, () => {
        hasChanged = true;
        currentGto.code = ELEM.edit.code.value;
    });

    setChangeHandler(ELEM.edit.place, () => {
        hasChanged = true;
        currentGto.place_id = Number(ELEM.edit.place.value);
    });

    ELEM.edit.active.onclick = () => {
        hasChanged = true;
        currentGto.active = ELEM.edit.active.checked;
        console.log("MATIV: ", currentGto.active);
    };
}

module.exports = {
    bind: bind,
    show: show,
    onSave: (/** @type {(staff: Staff) => void} */ handler) => onSaveHandler = handler,

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
        fillList(ELEM.edit.place, placeList);
    }

}
