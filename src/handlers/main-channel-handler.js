//@ts-check
'use strict';

const dbService = require('../db/db-service');
const controller = require('../controller');
const pages = require('../pages');

let tsIdForEdit = null;

module.exports = {
    name: 'main-channel',

    startpageReady: (params, callback) => {
        dbService.open();
    },

    getTsForEdit: (params, callback) => {
        if (tsIdForEdit) {
            dbService.getTs(tsIdForEdit, (data) => {
                callback('tsForEdit', data);
            });
            tsIdForEdit = null;
        } else {
            callback('tsForEdit', null);
        }
    },

    onEditTs: (params, callback) => {
        tsIdForEdit = params;
        controller.windows.startwin().loadFile(pages.editTs);
    },

    showStartPage: (params, callback) => {
        tsIdForEdit = null;
        controller.windows.startwin().loadFile(pages.startPage);
    },
}
