//@ts-check
'use strict';

const dbService = require('../db/db-service');
const controller = require('../controller');
const pages = require('../pages');
const PROPS = require('../../properties');
const REPORT = require('../report/report-factory');
const { dialog } = require('electron');

/**
 * @typedef {Object} TsBeanForEdit
 * @property {number} id 
 * @property {string} plate
 */

/**
 * @typedef {import('../report/types').ReportOptions} ReportOptions
 */

/**
 * @type {TsBeanForEdit}
 */
let tsBeanForEdit = getEmptyTsBeanForEdit();
let tsIdForGtoList = null;

function getEmptyTsBeanForEdit() {
    return {
        id: -1,
        plate: ''
    }
}

module.exports = {
    name: 'main-channel',

    startpageReady: (params, callback) => {
        dbService.open();
        callback('properties', PROPS.get());
    },

    getTsForEdit: (params, callback) => {
        if (tsBeanForEdit.id > 0) {
            dbService.getTs(tsBeanForEdit.id, (data) => {
                callback('tsForEdit', data);
            });
            tsBeanForEdit = getEmptyTsBeanForEdit();
        } else {
            callback('tsForEdit', tsBeanForEdit);
        }
    },

    /**
     * @param {TsBeanForEdit} params 
     * @param {()=>void} callback 
     */
    onEditTs: (params, callback) => {
        tsBeanForEdit = params;
        controller.windows.startwin().loadFile(pages.editTs);
    },

    showStartPage: (params, callback) => {
        tsBeanForEdit = getEmptyTsBeanForEdit();
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

    report: (period, callback) => {
        const fileName = dialog.showSaveDialogSync({
            title: "Save report",
            buttonLabel: "Save Report File",
            defaultPath: period.from + "_" + period.to + "_report.xlsx",
            filters: [
                { name: 'XLSX', extensions: ['xlsx'] },
            ]
        });

        if (!fileName) {
            return;
        }

        dbService.place.getById(PROPS.get().placeId, (place) => {
            dbService.getReport(period.from, period.to, (data) => {

                /** @type {ReportOptions} */
                const reportOptions = { fileName, place, period, data }

                REPORT.create(reportOptions, (error) => {
                    if (error) {
                        return callback('reportError', error);
                    }
                    callback('reportReady', null);
                });
            });
        });
    },

}
