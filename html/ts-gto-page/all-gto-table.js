//@ts-check
'use strict';

const ELEM = require('./elements');
const { createDiv } = require('../elementsUtil');
const { toString : costString } = require('../cost-util');

/**
 * @typedef {import('../../src/db/repository/ts-repo').Ts} Ts
 * @typedef {import('../../src/db/repository/gto-repo').Gto} Gto
 * @typedef {import('../../src/db/repository/staff-repo').Staff} Staff
 * @typedef {import('../../src/db/repository/types-repo').GtoTestType} GtoTestType
 * @typedef {import('../../src/db/repository/types-repo').GtoResult} GtoResult
 * @typedef {import('../../src/db/repository/types-repo').GtoProcess} GtoProcess
 * @typedef {import('../../src/db/repository/types-repo').GtoPeriod} GtoPeriod
 * @typedef {import('../../src/db/repository/types-repo').GtoCostType} GtoCostType
 */

/**
 * @type Staff[]
 */
var staffList = []
/**
 * @type GtoTestType[]
 */
var testTypeList = []
/**
 * @type GtoResult[]
 */
var resultTypeList = []
/**
 * @type GtoProcess[]
 */
var processTypeList = []

/**
 * @param {Gto[]} gtoArray
 */
function setData(gtoArray) {
    ELEM.allGtoTable.innerHTML = '';
    for (let i = 0; i < gtoArray.length; i++) {
        const gto = gtoArray[i];
        const row = createDiv('table-row');
        row.onclick = () => { onGtoClickHandler(gto); };
        row.innerHTML = `
            <div class="table-col col1">${normDateString(gto.date)}</div>
            <div class="table-col col2">${normDateString(gto.stop_date)}</div>
            <div class="table-col col3">${getNameFromList(testTypeList, gto.test_type_id)}</div>
            <div class="table-col col4">${getNameFromList(resultTypeList, gto.result_id)}</div>
            <div class="table-col col5">${getNameFromList(processTypeList, gto.process_id)}</div>
            <div class="table-col col6">${getStaffText(gto.staff_id)}</div>
            <div class="table-col col7">${costString(gto.cost)}</div>
        `;
        ELEM.allGtoTable.appendChild(row);
    }
}


/**
 * @param {string} dateStr
 * @returns {string}
 */
function normDateString(dateStr) {
    const date = new Date(dateStr);
    if (date.toString() === 'Invalid Date') {
        return '-';
    }
    return date.toLocaleDateString();
}

/**
 * @param {{id:number, name:string}[]} list
 * @param {number} id 
 * @returns {string}
 */
function getNameFromList(list, id) {
    const result = list.find(elem => elem.id === id);
    return result ? result.name : '';
}

/**
 * @param {number} id
 * @returns {string}
 */
function getStaffText(id) {
    const result = staffList.find(staff => staff.id === id);
    return result ? result.full_name : '';
}

/**
 * @param {Gto} gto
 */
var onGtoClickHandler = (gto) => { };

module.exports = {
    setData: setData,
    onGtoClick: (/** @type {(gto: Gto) => void} */ handler) => onGtoClickHandler = handler,

    /**
     * @param {Staff[]} staffArray
     */
    setStaffList: (staffArray) => {
        staffList = staffArray;
    },

    /**
     * @param {GtoTestType[]} testTypeArray
     */
    setTestTypeList: (testTypeArray) => {
        testTypeList = testTypeArray;
    },

    /**
     * @param {GtoResult[]} resultTypeArray
     */
    setResultTypeList: (resultTypeArray) => {
        resultTypeList = resultTypeArray;
    },

    /**
     * @param {GtoProcess[]} processTypeArray
     */
    setProcessTypeList: (processTypeArray) => {
        processTypeList = processTypeArray;
    },
}
