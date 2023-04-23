//@ts-check
'use strict';

module.exports = {
    normalize: normalize,
    valid: valid,
    parse: parse,
    toString: toString,
}

/**
 * @param {HTMLInputElement} costElem
 */
function normalize(costElem) {
    const val = costElem.value;
    const dot = val.indexOf('.');
    if (dot < 0) {
        return;
    }

    const zeros = val.substring(dot + 1).length;
    if (zeros > 2) {
        costElem.value = val.substring(0, val.length - zeros + 2);
    }
}

/**
 * @param {HTMLInputElement} costElem
 * @param {number} cost
 */
function valid(costElem, cost) {
    if (!cost || cost === 0) {
        if (!costElem.classList.contains("bad")) {
            costElem.classList.add("bad");
        }
    } else {
        if (costElem.classList.contains("bad")) {
            costElem.classList.remove("bad");
        }
    }
}

/**
 * @param {HTMLInputElement} costElem
 */
function parse(costElem) {
    const fl = parseFloat(costElem.value).toFixed(2);
    const costStr = String(fl);

    let strArr = costStr.split(".");
    const rub = Number(strArr[0]);
    const kop = strArr.length > 1 ? Number(strArr[1].substring(0, 2)) : 0;
    return Number(String(rub) + String(kop).padEnd(2, '0'));
}

/**
 * @param {number} cost
 * @returns {string}
 */
function toString(cost) {
    const str = String(cost);
    const rub = str.substring(0, str.length - 2);
    const kop = str.substring(str.length - 2);
    return (rub.length == 0 ? "0" : rub) + '.' + kop;
}