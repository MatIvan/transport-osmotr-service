//@ts-check
'use strict'

const dbInit = require('./db-init');
const UTIL = require('./db-util');

const PLACE_REPO = require('./repository/place-repo');
const TYPES_REPO = require('./repository/types-repo');
const OWNER_REPO = require('./repository/owner-repo');
const DOC_REPO = require('./repository/doc-repo');
const TS_REPO = require('./repository/ts-repo');
const STAFF_REPO = require('./repository/staff-repo');
const GTO_REPO = require('./repository/gto-repo');
const STARTPAGE_REPO = require('./repository/startpage-repo');
const REPORT_REPO = require('./repository/report-repo');

/**
 * @typedef {import('./repository/ts-repo').Ts} Ts
 * @typedef {import('./repository/owner-repo').Owner} Owner
 * @typedef {import('./repository/doc-repo').Doc} Doc
 * @typedef {import('../handlers/main-channel-handler').TsBeanForEdit } TsBeanForEdit
 * @typedef {import('./repository/gto-repo').Gto} Gto
 * 
 * @typedef {import('../../html/date-util').DatePeriod} DatePeriods
 */

module.exports = {
    open: dbInit.open,
    close: dbInit.close,

    place: PLACE_REPO,
    staff: STAFF_REPO,
    types: TYPES_REPO,
    gto: GTO_REPO,

    getTs: selectTsById,
    saveTs: saveTs,
    getTsBeanForEditByPlate: getTsBeanForEditByPlate,
    getStartpageTableByDate: STARTPAGE_REPO.getStartpageTableByDate,

    getReport: REPORT_REPO.selectReportData,
}

/**
 * @param {TsBeanForEdit} tsBeanForEdit
 * @param {(tsBeanForEditByPlate:TsBeanForEdit)=>void} callback
*/
function getTsBeanForEditByPlate(tsBeanForEdit, callback) {
    TS_REPO.getTsIdByPlate(tsBeanForEdit.plate, (tsId) => {
        callback({
            id: tsId,
            plate: tsBeanForEdit.plate
        });
    });
}

/**
 * @param {number} id
 * @param {(ts:Ts)=>void} callback
*/
function selectTsById(id, callback) {
    UTIL.transaction(() => {
        TS_REPO.getById(id, function (ts) {
            OWNER_REPO.getById(ts.owner?.id, function (owner) {
                DOC_REPO.getById(ts.doc?.id, function (doc) {
                    UTIL.commit();
                    /** @type {Ts} */
                    const resultTs = {
                        ...ts,
                        owner: owner,
                        doc: doc,
                    }
                    console.log(`selectTS result: ${JSON.stringify(resultTs)}`);
                    callback(resultTs);
                });
            });
        });
    });
}

/**
 * @param {Ts} ts
 * @param {(ts:Ts)=>void} callback
*/
function saveTs(ts, callback) {
    UTIL.transaction(() => {
        OWNER_REPO.save(ts.owner, (newOwner) => {
            DOC_REPO.save(ts.doc, (newDoc) => {
                TS_REPO.save(ts, (newTs) => {
                    UTIL.commit();
                    /** @type {Ts} */
                    const resultTs = {
                        ...newTs,
                        owner: newOwner,
                        doc: newDoc,
                    }
                    callback(resultTs);
                });
            });
        });
    });
}
