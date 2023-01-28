//@ts-check
'use strict';

const { getDiv, getInput } = require('../elementsUtil');

module.exports = {
    caption: getDiv('caption'),
    ts: {
        ts_category: getInput('ts.ts_category'),
        ats_type: getInput('ts.ats_type'),
    }
}
