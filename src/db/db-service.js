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

/**
 * @typedef {import('./repository/ts-repo').Ts} Ts
 * @typedef {import('./repository/owner-repo').Owner} Owner
 * @typedef {import('./repository/doc-repo').Doc} Doc
 * @typedef {import('../handlers/main-channel-handler').TsBeanForEdit } TsBeanForEdit
 * @typedef {import('./repository/gto-repo').Gto} Gto
 * 
 * @typedef {import('../../html/date-util').DatePeriod} DatePeriods
 */

/**
 * @typedef {Object} ReportData
 * @property {number} id 
 * @property {string} plate
 */

/*
SELECT 
	gto.date 	AS date,
	s.full_name AS staff,
	tt.name 	AS test_type,
	ts.plate 	AS plate,
	ts."year"   AS release_year,
	atst.name 	AS ats_type,
    ts.brand || ' ' || ts.model AS marka,
    o.first_name || ' ' || o.second_name || ' ' || o.midle_name AS owner,
    p.name 		AS period,
    gto.cost 	AS cost,
    ct.name 	AS cost_type,
    ct.id
FROM gto
INNER JOIN staff s ON s.id = gto.staff_id
INNER JOIN test_type tt ON tt.id = gto.test_type_id 
INNER JOIN ts ON ts.id = gto.ts_id 
INNER JOIN ats_type atst ON atst.id = ts.ats_type_id
INNER JOIN owner o ON o.id = ts.owner_id 
INNER JOIN period p ON gto.period_id 
INNER JOIN cost_type ct ON gto.cost_type_id 
WHERE gto.cost_type_id = 1;
	  AND gto.date BETWEEN '2023-01-18' AND '2023-02-20';
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

    getReport: getReport,
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

/**
 * @param {DatePeriods} period
 * @param {(reportData: ReportData)=>void} callback
 */
function getReport(period, callback) {
    //TODO
}