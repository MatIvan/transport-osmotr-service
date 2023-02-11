//@ts-check
'use strict';
const { fillList, setChangeHandler } = require('../elementsUtil');
const ELEM = require('./elements');

/**
 * @typedef {import('../../src/db/repository/staff-repo').Staff} Staff
 * @typedef {import('../../src/db/repository/place-repo').Place} Place
 */

/**
 * @type {Staff}
 */
var currentStaff = emptyStaff();

var hasChanged = false;

/**
 * @returns {Staff}
 */
function emptyStaff() {
    return { id: -1, full_name: '', code: '', place_id: -1, active: false }
}

/**
 * @param {Staff} staff 
 */
var onSaveHandler = (staff) => { };

/**
 * @param {Staff | null} staff
 */
function show(staff) {
    ELEM.editLay.classList.remove("hide");
    currentStaff = staff || emptyStaff();
    ELEM.edit.fullName.value = currentStaff.full_name;
    ELEM.edit.code.value = currentStaff.code;
    ELEM.edit.place.value = String(currentStaff.place_id);
    ELEM.edit.active.checked = currentStaff.active;
}

function hide() {
    hasChanged = false;
    currentStaff = emptyStaff();
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
        onSaveHandler(JSON.parse(JSON.stringify(currentStaff)));//deep copy
        hide();
    }

    setChangeHandler(ELEM.edit.fullName, () => {
        hasChanged = true;
        currentStaff.full_name = ELEM.edit.fullName.value;
    });

    setChangeHandler(ELEM.edit.code, () => {
        hasChanged = true;
        currentStaff.code = ELEM.edit.code.value;
    });

    setChangeHandler(ELEM.edit.place, () => {
        hasChanged = true;
        currentStaff.place_id = Number(ELEM.edit.place.value);
    });

    ELEM.edit.active.onclick = () => {
        hasChanged = true;
        currentStaff.active = ELEM.edit.active.checked;
        console.log("MATIV: ", currentStaff.active);
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
