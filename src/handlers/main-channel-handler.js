//@ts-check
'use strict';

const dbService = require('../db/db-service');
const controller = require('../controller');
const pages = require('../pages');

let tsIdForEdit = null;

module.exports.name = 'main-channel';

module.exports.startpageReady = (params, callback) => {
    dbService.open();
}

module.exports.getTsForEdit = (params, callback) => {
    dbService.selectTS(tsIdForEdit, (data) => {
        callback('tsForEdit', data);
    });
    tsIdForEdit = null;
}

module.exports.onEditTs = (params, callback) => {
    tsIdForEdit = params;
    controller.windows.startwin().loadFile(pages.editTs);
}
