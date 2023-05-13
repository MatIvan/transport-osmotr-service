//@ts-check
'use strict';

const ELEM = require('./elements');
const { toString: costString } = require('../cost-util');

/**
 * @typedef {import('../../src/db/repository/startpage-repo').StartTableBean} StartTableBean
 */

module.exports = {
    setData: setData,
}

/**
 * @param {StartTableBean[]} startTable
 */
function setData(startTable) {
    let summ = 0;
    for (let i = 0; i < startTable.length; i++) {
        const bean = startTable[i];
        summ += bean.cost;
    }
    ELEM.summ.summVal.value = costString(summ);
    ELEM.summ.carsNumber.value = String(startTable.length);
}
