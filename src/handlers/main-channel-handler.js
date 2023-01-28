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
            dbService.selectTS(tsIdForEdit, (data) => {
                callback('tsForEdit', data);
            });
            tsIdForEdit = null;
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
