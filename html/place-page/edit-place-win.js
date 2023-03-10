//@ts-check
'use strict';
const { setChangeHandler } = require('../elementsUtil');
const ELEM = require('./elements');
const ALERT_WIN = require('../alert');
const CONFIRM_WIN = require('../confirm');

/**
 * @typedef {import('../../src/db/repository/place-repo').Place} Place
 */

/**
 * @type {Place}
 */
var currentPlace = emptyPlace();

var hasChanged = false;

/**
 * @returns {Place}
 */
function emptyPlace() {
    return { id: -1, name: '', address: '', oto_number: '', }
}

/**
 * @param {Place} place 
 */
var onSaveHandler = (place) => { };

/**
 * @param {Place | null} place
 */
function show(place) {
    ELEM.editLay.classList.remove("hide");
    currentPlace = place || emptyPlace();
    ELEM.edit.name.value = currentPlace.name;
    ELEM.edit.address.value = currentPlace.address;
    ELEM.edit.otoNumber.value = currentPlace.oto_number;
    refreshUiState();
}

function hide() {
    hasChanged = false;
    currentPlace = emptyPlace();
    ELEM.editLay.classList.add("hide");
}

function refreshUiState() {
    if (hasChanged) {
        ELEM.ui.btnEditSave.removeAttribute('disabled');
    } else {
        ELEM.ui.btnEditSave.setAttribute('disabled', "true");
    }
}

function bind() {
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
        onSaveHandler(JSON.parse(JSON.stringify(currentPlace)));//deep copy
        hide();
    }

    setChangeHandler(ELEM.edit.name, () => {
        hasChanged = true;
        currentPlace.name = ELEM.edit.name.value;
        refreshUiState();
    });

    setChangeHandler(ELEM.edit.address, () => {
        hasChanged = true;
        currentPlace.address = ELEM.edit.address.value;
        refreshUiState();
    });

    setChangeHandler(ELEM.edit.otoNumber, () => {
        hasChanged = true;
        currentPlace.oto_number = ELEM.edit.otoNumber.value;
        refreshUiState();
    });
}

module.exports = {
    bind: bind,
    show: show,
    onSave: (/** @type {(place: Place) => void} */ handler) => onSaveHandler = handler,
}