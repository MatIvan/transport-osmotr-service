//@ts-check
'use strict';

const dbService = require('../db/db-service');


function wrapCallback(cmd, callback) {
    return (data) => {
        callback(cmd, data);
    }
}

module.exports.name = 'database-channel';

module.exports.getTsCategory = (params, callback) => {
    dbService.selectAllTsCategory(wrapCallback('tsCategory', callback));
}

module.exports.getAtsType = (tsCategoryId, callback) => {
    dbService.selectAtsTypeByCategory(tsCategoryId, wrapCallback('atsType', callback));
}