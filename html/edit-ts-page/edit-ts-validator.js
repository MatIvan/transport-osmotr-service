//@ts-check
'use strict';

/**
 * @typedef {import('../../src/db/repository/ts-repo').Ts} Ts
 */

module.exports = {
    all,
    plate,
    category,
    atsType,
    year,
    vin
}

/**
 * @param {Ts} ts
 * @returns {boolean}
 */
function all(ts) {
    // vin - is warning
    return plate(ts)
        && category(ts)
        && atsType(ts)
        && year(ts);
}

/**
 * @param {Ts} ts
 * @returns {boolean}
 */
function plate(ts) {
    return ts.plate.length > 4;
}

/**
 * @param {Ts} ts
 * @returns {boolean}
 */
function category(ts) {
    return ts.ts_category_id > -1;
}

/**
 * @param {Ts} ts
 * @returns {boolean}
 */
function atsType(ts) {
    return ts.ats_type_id > -1;
}

/**
 * @param {Ts} ts
 * @returns {boolean}
 */
function year(ts) {
    return ts.year > 1900 && ts.year < 2099;
}

/**
 * @param {Ts} ts
 * @returns {boolean}
 */
function vin(ts) {
    return ts.no_vin || validateVin(ts.vin, ts.year);
}

/**
 * @param {string} vin 
 * @param {number} year 
 * @returns {boolean}
 */
function validateVin(vin, year) {
    if (year > 1980) {
        var re = new RegExp("^[A-HJ-NPR-Z\\d]{8}[\\dX][A-HJ-NPR-Z\\d]{2}\\d{6}$");
        return !!vin.match(re);
    } else {
        //Pre validation are rules to complex. We are forced to assume the vin is valid.
        //Though really at least a simple test would be preferable - eg vin.length >= 20 or whatever
        return true;
    }
}