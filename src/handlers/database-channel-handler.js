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
        dbService.selectAllTsCategory(wrapCallback('tsCategory', callback));
    },
    getAtsType: (tsCategoryId, callback) => {
        dbService.selectAtsTypeByCategory(tsCategoryId, wrapCallback('atsType', callback));
    },
    getTsEngineType: (params, callback) => {
        dbService.selectAllEngineType(wrapCallback('tsEngineType', callback));
    },
    getOwnerType: (params, callback) => {
        dbService.selectAllOwnerType(wrapCallback('ownerType', callback));
    },
    getDocType: (params, callback) => {
        dbService.selectAllDocType(wrapCallback('docType', callback));
    },
    saveTs: (params, callback) => {
        dbService.saveTs(params, wrapCallback('tsSavedSuccess', callback));
    },
}
