//@ts-check
'use strict';

const ELEM = require('./elements');
const { createDiv } = require('../elementsUtil');

/**
 * @typedef {import('../../src/db/repository/startpage-repo').StartTableBean} StartTableBean
 */

/**
 * @type {StartTableBean | null}
 */
var selectedBean = null;

/**
 * @param {StartTableBean[]} startTable
 */
function setData(startTable) {
    ELEM.table.innerHTML = '';

    for (let i = 0; i < startTable.length; i++) {
        const bean = startTable[i];
        const row = createDiv('table-row');
        row.onclick = () => {
            selectedBean = bean;
            onRowClickHandler(bean);
        };
        row.innerHTML = `
            <div class="table-col col1">${normStr(bean.plate)}</div>
            <div class="table-col col2">${normStr(bean.tsFullName)}</div>
            <div class="table-col col3">${normStr(bean.category)}</div>
            <div class="table-col col4">${normStr(bean.test)}</div>
            <div class="table-col col5">${normStr(bean.resultName)}</div>
        `;
        ELEM.table.appendChild(row);
    }
}

function normStr(val) {
    return val ? val : '-';
}

/**
 * @param {StartTableBean} bean
 */
var onRowClickHandler = (bean) => { };

module.exports = {
    setData: setData,
    onRowClick: (/** @type {(bean: StartTableBean) => void} */ handler) => onRowClickHandler = handler,
    selectedBean: () => { return selectedBean; },
}
