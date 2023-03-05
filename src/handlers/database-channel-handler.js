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
    getAllStaff: (params, callback) => {
        dbService.staff.getAll(wrapCallback('allStaff', callback));
    },
    saveStaff: (params, callback) => {
        dbService.staff.save(params, wrapCallback('staffSavedSuccess', callback));
    },
    getGtoTestType: (params, callback) => {
        dbService.types.getGtoTestType(wrapCallback('gtoTestType', callback));
    },
    getGtoResult: (params, callback) => {
        dbService.types.getGtoResult(wrapCallback('gtoResult', callback));
    },
    getGtoProcess: (params, callback) => {
        dbService.types.getGtoProcess(wrapCallback('gtoProcess', callback));
    },
    getGtoPeriod: (params, callback) => {
        dbService.types.getGtoPeriod(wrapCallback('gtoPeriod', callback));
    },
    getGtoCostType: (params, callback) => {
        dbService.types.getGtoCostType(wrapCallback('gtoCostType', callback));
    },
    getGtoByTsId: (params, callback) => {
        dbService.gto.getByTs(params, wrapCallback('gtoByTsId', callback));
    },
    saveGto: (params, callback) => {
        dbService.gto.save(params, wrapCallback('gtoSavedSuccess', callback));
    },
    getTsBeanForEditByPlate: (params, callback) => {
        dbService.getTsBeanForEditByPlate(params, wrapCallback('tsBeanForEditByPlate', callback));
    },
    getStartpageTableByDate: (params, callback) => {
        dbService.getStartpageTableByDate(params, wrapCallback('startpageTable', callback));
    },
}
