//@ts-check
'use strict';

const RPC = require('../rpc');
const ELEM = require('./elements');
const ALL_TABLE = require('./all-gto-table');
const EDIT_WIN = require('./ts-gto-win');
const WAIT_WIN = require('../wait-win');
const ALERT_WIN = require('../alert');

/**
 * @typedef {import('../../src/db/repository/ts-repo').Ts} Ts
 * @typedef {import('../../src/db/repository/gto-repo').Gto} Gto
 * @typedef {import('../../src/db/repository/place-repo').Place} Place
 * @typedef {import('../../src/db/repository/staff-repo').Staff} Staff
 * @typedef {import('../../src/db/repository/types-repo').GtoTestType} GtoTestType
 * @typedef {import('../../src/db/repository/types-repo').GtoResult} GtoResult
 * @typedef {import('../../src/db/repository/types-repo').GtoProcess} GtoProcess
 * @typedef {import('../../src/db/repository/types-repo').GtoPeriod} GtoPeriod
 * @typedef {import('../../src/db/repository/types-repo').GtoCostType} GtoCostType
 */

/**
 * @type {Ts | null}
 */
var currentTs = null;

WAIT_WIN.show();

RPC.bind({
    /**
     * @param {string} msg
     */
    databaseError: (msg) => {
        ALERT_WIN.show('ОШИБКА !!!<br><br>' + msg);
        WAIT_WIN.hide();
    },

    /**
    * @param {Ts} ts
    */
    tsForGtoList: (ts) => {
        console.log("tsForGtoList", ts);
        currentTs = ts;
        if (currentTs) {
            ELEM.ui.subcaption.innerText = currentTs.plate;
            RPC.getGtoByTsId(currentTs.id);
        } else {
            ELEM.ui.subcaption.innerText = 'НЕТ';
            ALERT_WIN.show('ОШИБКА !!!<br>Не указано транспортное средство.');
        }
    },

    /**
    * @param {Gto[]} gtoArray
    */
    gtoByTsId: (gtoArray) => {
        ALL_TABLE.setData(gtoArray);
        WAIT_WIN.hide();
    },

    gtoSavedSuccess: () => {
        WAIT_WIN.show();
        RPC.getGtoByTsId(currentTs ? currentTs.id : -1);
    },

    /**
    * @param {Staff[]} staffArray
    */
    allStaff: (staffArray) => {
        ALL_TABLE.setStaffList(staffArray);
        EDIT_WIN.setStaffList(staffArray);
    },

    /**
    * @param {Place[]} placeArray
    */
    allPlace: (placeArray) => {
        EDIT_WIN.setPlaceList(placeArray);
    },

    /**
    * @param {GtoTestType[]} testTypeArray
    */
    gtoTestType: (testTypeArray) => {
        ALL_TABLE.setTestTypeList(testTypeArray);
        EDIT_WIN.setTestTypeList(testTypeArray);
    },

    /**
    * @param {GtoResult[]} resultTypeArray
    */
    gtoResult: (resultTypeArray) => {
        ALL_TABLE.setResultTypeList(resultTypeArray);
        EDIT_WIN.setResultTypeList(resultTypeArray);
    },

    /**
    * @param {GtoProcess[]} processTypeArray
    */
    gtoProcess: (processTypeArray) => {
        ALL_TABLE.setProcessTypeList(processTypeArray);
        EDIT_WIN.setProcessTypeList(processTypeArray);
    },

    /**
    * @param {GtoPeriod[]} periodTypeArray
    */
    gtoPeriod: (periodTypeArray) => {
        EDIT_WIN.setPeriodTypeList(periodTypeArray);
    },

    /**
    * @param {GtoCostType[]} costTypeArray
    */
    gtoCostType: (costTypeArray) => {
        EDIT_WIN.setCostTypeList(costTypeArray);
    },

});

ALL_TABLE.onGtoClick((gto) => {
    EDIT_WIN.show(currentTs ? currentTs.id : -1, gto);
});

EDIT_WIN.bind();
EDIT_WIN.onSave((gto) => {
    WAIT_WIN.show();
    RPC.saveGto(gto);
});

ELEM.ui.btnCancel.onclick = () => {
    RPC.onEditTs(currentTs ? currentTs.id : -1);
}

ELEM.ui.btnAddGto.onclick = () => {
    EDIT_WIN.show(currentTs ? currentTs.id : -1, null);
}

RPC.getAllPlace();
RPC.getAllStaff();
RPC.getGtoTestType();
RPC.getGtoResult();
RPC.getGtoProcess();
RPC.getGtoPeriod();
RPC.getGtoCostType();

RPC.getTsForGtoList();
