//@ts-check
'use strict';

const { fillList } = require('../elementsUtil');
const ELEM = require('./elements');

/**
 * @typedef {(value: string) => void} OnStringHandler
 * @typedef {(value: number) => void} OnNumberHandler
 */

function refreshAll() {

}

function setChangeHandler(element, handler) {
    element.onchange = handler;
    element.onkeyup = handler;
}

function prepareElements() {

}

const HANDLER = {

}

module.exports = {
    prepareElements: prepareElements,
    refreshAll: refreshAll,
}
