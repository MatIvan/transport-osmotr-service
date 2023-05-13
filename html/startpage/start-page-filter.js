//@ts-check
'use strict';

const ELEM = require('./elements');

/**
 * @typedef {import('../../src/db/repository/types-repo').GtoCostType} GtoCostType
 * @typedef {import('../../src/db/repository/startpage-repo').StartTableBean} StartTableBean
 */

module.exports = {
    bind,
    filter,
    setCostTypeList,
}

/**
 * @param {() => void} onUpdate
 */
function bind(onUpdate) {
    ELEM.filter.costType.onchange = () => {
        onUpdate();
    }
}

/**
* @param {StartTableBean[]} costTypeArray
*/
function filter(costTypeArray) {
    const val = ELEM.filter.costType.value;
    return costTypeArray.filter((bean) => (val === "-" || bean.costType === val));
}

/**
* @param {GtoCostType[]} costTypeArray
*/
function setCostTypeList(costTypeArray) {
    let rows = `<option value="-">Все</option>`;
    for (let i = 0; i < costTypeArray.length; i++) {
        const item = costTypeArray[i];
        rows += `<option value=${item.name}>${item.name}</option>`
    }
    ELEM.filter.costType.innerHTML = rows;
}
