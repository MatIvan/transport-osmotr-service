//@ts-check
'use strict';

const dbService = require('../db/db-service');


function wrapCallback(cmd, callback) {
    return (data) => {
        callback(cmd, data);
    }
}

module.exports = {
    name: 'database-channel',

    getTsCategory: (params, callback) => {
        dbService.types.getTsCategory(wrapCallback('tsCategory', callback));
    },
    getAtsType: (params, callback) => {
        dbService.types.getAtsTypeByCategory(wrapCallback('atsType', callback));
    },
    getTsEngineType: (params, callback) => {
        dbService.types.getEngineType(wrapCallback('tsEngineType', callback));
    },
    getOwnerType: (params, callback) => {
        dbService.types.getOwnerType(wrapCallback('ownerType', callback));
    },
    getDocType: (params, callback) => {
        dbService.types.getDocType(wrapCallback('docType', callback));
    },
    saveTs: (params, callback) => {
        dbService.saveTs(params, wrapCallback('tsSavedSuccess', callback));
    },
    getAllPlace: (params, callback) => {
        dbService.place.getAll(wrapCallback('allPlace', callback));
    },
    savePlace: (params, callback) => {
        dbService.place.save(params, wrapCallback('placeSavedSuccess', callback));
    },
}
