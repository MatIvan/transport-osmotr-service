//@ts-check
'use strict';

const { getDiv, getInput, getSelector, getDate } = require('../elementsUtil');

module.exports = {
    ui: {
        caption: getDiv('caption'),
        btnCancel: getDiv('btnCancel'),
        btnSave: getDiv('btnSave'),
    },
    ts: {
        plate: getInput('ts.plate'),
        no_grz: getInput('ts.no_grz'),
        brandModel: getDiv('ts.brand-model'),
        brand: getInput('ts.brand'),
        model: getInput('ts.model'),
        vin: getInput('ts.vin'),
        no_vin: getInput('ts.no_vin'),
        year: getInput('ts.year'),
        chassis: getInput('ts.chassis'),
        body: getInput('ts.body'),
        btnBodyCopyVin: getDiv('ts.btnBodyCopyVin'),
        ts_category: getSelector('ts.ts_category'),
        ats_type: getSelector('ts.ats_type'),
        engine_type: getSelector('ts.engine_type'),
        odometer: getInput('ts.odometer'),
    },
    owner: {
        first_name: getInput('owner.first_name'),
        second_name: getInput('owner.second_name'),
        midle_name: getInput('owner.midle_name'),
        type: getSelector('owner.owner_type'),
    },
    doc: {
        type: getSelector('ts_doc.type'),
        series: getInput('ts_doc.series'),
        number: getInput('ts_doc.number'),
        issuer: getInput('ts_doc.issuer'),
        date: getDate('ts_doc.date'),
        full: getDiv('ts_doc.full'),
    }
}
