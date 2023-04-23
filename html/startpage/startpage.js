//@ts-check
'use strict';

const { bindUpperValue, setChangeHandler } = require('../elementsUtil');
const ELEM = require('./elements');
const RPC = require('../rpc');
const WAIT_WIN = require('../wait-win');
const ALERT_WIN = require('../alert');
const CONFIRM = require('../confirm');
const EDIT_WIN = require('../edit-gto-win/edit-gto-win');
const START_TABLE = require('./start-table');
const DATE_UTIL = require('../date-util');
const START_PAGE_FILTER = require('./start-page-filter');
/**
 * @typedef {import('../date-util').DatePeriod} DatePeriod
 * @typedef {import('../../properties').Properties} Properties
 * @typedef {import('../../src/handlers/main-channel-handler').TsBeanForEdit} TsBeanForEdit
 * @typedef {import('../../src/db/repository/startpage-repo').StartTableBean} StartTableBean
 */

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

const appVers = RPC.appVersions;
ELEM.versionInfo.innerText = `Chrome ${appVers.chrome()}; Node.js ${appVers.node()}; Electron ${appVers.electron()}`;

/**
 * @type Properties
 */
var props = {
    placeId: -1,
    dbPath: ""
}

/**
*  @type {StartTableBean[]} startTable
*/
var currentStartTable = [];

var selectedDate = new Date().toISOString().substring(0, 10);

RPC.bind({
    /**
     * @param {Properties} properties
     */
    properties: (properties) => {
        props = properties
        RPC.getAllPlace();
        RPC.getAllStaff();
        RPC.getGtoTestType();
        RPC.getGtoResult();
        RPC.getGtoProcess();
        RPC.getGtoPeriod();
        RPC.getGtoCostType();

        update();
    },

    /**
    * @param {Place[]} placeArray
    */
    allPlace: (placeArray) => {
        const place = placeArray.find(place => place.id === props.placeId);
        if (place) {
            ELEM.ui.caption.innerText = place.name + ' ' + place.address;
        }
        EDIT_WIN.setPlaceList(placeArray);
        WAIT_WIN.hide();
    },

    /**
    * @param {TsBeanForEdit} tsBeanForEdit
    */
    tsBeanForEditByPlate: (tsBeanForEdit) => {
        WAIT_WIN.hide();
        if (tsBeanForEdit.id > 0) {
            return RPC.onEditTs(tsBeanForEdit);
        }
        CONFIRM.show(`Номер ${tsBeanForEdit.plate} не найде.<br>Создать новое ТС?`, () => {
            RPC.onEditTs(tsBeanForEdit);
        });
    },

    /**
     * @param {StartTableBean[]} startTable
     */
    startpageTable: (startTable) => {
        currentStartTable = startTable;
        refresh();
        WAIT_WIN.hide();
    },

    /**
    * @param {Staff[]} staffArray
    */
    allStaff: (staffArray) => {
        EDIT_WIN.setStaffList(staffArray);
    },

    /**
    * @param {GtoTestType[]} testTypeArray
    */
    gtoTestType: (testTypeArray) => {
        EDIT_WIN.setTestTypeList(testTypeArray);
    },

    /**
    * @param {GtoResult[]} resultTypeArray
    */
    gtoResult: (resultTypeArray) => {
        EDIT_WIN.setResultTypeList(resultTypeArray);
    },

    /**
    * @param {GtoProcess[]} processTypeArray
    */
    gtoProcess: (processTypeArray) => {
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
        START_PAGE_FILTER.setCostTypeList(costTypeArray);
    },

    gtoSavedSuccess: () => {
        update();
    },

    /**
    * @param {Gto} gto
    */
    setGto: (gto) => {
        WAIT_WIN.hide();
        const bean = START_TABLE.selectedBean();
        EDIT_WIN.show(
            gto.ts_id,
            bean ? bean.plate : '',
            gto);
    },

    reportReady: () => {
        console.log('report ready.');
        ALERT_WIN.show('Отчет создан.');
    }
});

WAIT_WIN.show();

START_PAGE_FILTER.bind(() => {
    refresh();
});

ELEM.report.btnUpdate.onclick = () => {
    update();
}

ELEM.report.btnReportDay.onclick = () => {
    RPC.report(DATE_UTIL.getPeriodDay(selectedDate));
}

ELEM.report.btnReportMonth.onclick = () => {
    RPC.report(DATE_UTIL.getPeriodMonth(selectedDate));
}

EDIT_WIN.bind(ELEM.editLay);
EDIT_WIN.onSave((bean) => {
    WAIT_WIN.show();
    RPC.saveGto(bean);
});

bindUpperValue(ELEM.ui.searchPlate);

ELEM.ui.filterDate.value = selectedDate;
setChangeHandler(ELEM.ui.filterDate, () => {
    update();
});

ELEM.ui.btnSearchPlate.onclick = () => {
    search();
}

ELEM.ui.searchPlate.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        search();
    }
});

START_TABLE.onRowClick((startTableBean) => {
    WAIT_WIN.show();
    RPC.getGtoById(startTableBean.gtoId);
});

RPC.startpageReady();

function search() {
    WAIT_WIN.show();
    RPC.getTsBeanForEditByPlate({ id: -1, plate: ELEM.ui.searchPlate.value });
}

function update() {
    selectedDate = ELEM.ui.filterDate.value;
    WAIT_WIN.show();
    RPC.getStartpageTableByDate(selectedDate);
}

function refresh() {
    START_TABLE.setData(START_PAGE_FILTER.filter(currentStartTable));
}
