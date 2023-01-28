//@ts-check
'use strict';

const { getDiv, getInput } = require('../elementsUtil');

module.exports = {
    caption: getDiv('caption'),
    ts: {
        plate: getInput('ts.plate'),
        no_grz: getInput('ts.no_grz'),
        brandModel: getInput('ts.brand-model'),
        brand: getInput('ts.brand'),
        model: getInput('ts.model'),
        ts_category: getInput('ts.ts_category'),
        ats_type: getInput('ts.ats_type'),
    }
}
