//@ts-check
'use strict';

const dbService = require('../db/db-service');
const controller = require('../controller');
const pages = require('../pages');
const PROPS = require('../../properties');

let tsIdForEdit = null;
let tsIdForGtoList = null;

module.exports = {
    name: 'main-channel',

    startpageReady: (params, callback) => {
        dbService.open();
        callback('properties', PROPS.get());
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

    onGtoListForTs: (params, callback) => {
        tsIdForGtoList = params;
        controller.windows.startwin().loadFile(pages.editGto);
    },

    getTsForGtoList: (params, callback) => {
        if (tsIdForGtoList) {
            dbService.getTs(tsIdForGtoList, (data) => {
                callback('tsForGtoList', data);
            });
            tsIdForGtoList = null;
        } else {
            callback('tsForGtoList', null);
        }
    },
}
