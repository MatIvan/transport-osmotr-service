//@ts-check
'use strict';

/**
 * @typedef {Object} DatePeriod
 * @property {string} from
 * @property {string} to
 */

module.exports = {
    getPeriodDay,
    getPeriodMonth,
}

/**
 * @param {string} date
 * @returns {DatePeriod}
 */
function getPeriodDay(date) {
    return {
        from: date,
        to: date
    };
}

/**
 * @param {string} date
 * @returns {DatePeriod}
 */
function getPeriodMonth(date) {
    let d = new Date(date);
    const dateFrom = new Date(d.getFullYear(), d.getMonth(), 2); // first day of month
    const dateTo = new Date(d.getFullYear(), d.getMonth() + 1, 1);// last day of month
    return {
        from: dateFrom.toISOString().substring(0, 10),
        to: dateTo.toISOString().substring(0, 10)
    };
}
