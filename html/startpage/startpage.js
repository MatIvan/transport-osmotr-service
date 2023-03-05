//@ts-check
'use strict';

const { bindUpperValue, setChangeHandler } = require('../elementsUtil');
const ELEM = require('./elements');
const RPC = require('../rpc');
const WAIT_WIN = require('../wait-win');
const CONFIRM = require('../confirm');
const EDIT_WIN = require('../edit-gto-win/edit-gto-win');
const START_TABLE = require('./start-table');

/**
 * @typedef {import('../../properties').Properties} Properties
 * @typedef {import('../../src/db/repository/place-repo').Place} Place
 * @typedef {import('../../src/handlers/main-channel-handler').TsBeanForEdit} TsBeanForEdit
 * @typedef {import('../../src/db/repository/startpage-repo').StartTableBean} StartTableBean
 */

const appVers = RPC.appVersions;
ELEM.versionInfo.innerText = `Chrome ${appVers.chrome()}; Node.js ${appVers.node()}; Electron ${appVers.electron()}`;

/**
 * @type Properties
 */
var props = {
    placeId: -1
}

var selectedDate = new Date().toISOString().substring(0, 10);

RPC.bind({
    /**
     * @param {Properties} properties
     */
    properties: (properties) => {
        props = properties
        RPC.getAllPlace();
    },

    /**
    * @param {Place[]} placeArray
    */
    allPlace: (placeArray) => {
        const place = placeArray.find(place => place.id === props.placeId);
        if (place) {
            ELEM.ui.caption.innerText = place.name + ' ' + place.address;
        }
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
        START_TABLE.setData(startTable);
        WAIT_WIN.hide();
    },
});
WAIT_WIN.show();

bindUpperValue(ELEM.ui.searchPlate);

ELEM.ui.filterDate.value = selectedDate;
setChangeHandler(ELEM.ui.filterDate, () => {
    selectedDate = ELEM.ui.filterDate.value;
    WAIT_WIN.show();
    RPC.getStartpageTableByDate(selectedDate);
});

ELEM.ui.btnSearchPlate.onclick = () => {
    WAIT_WIN.show();
    RPC.getTsBeanForEditByPlate({ id: -1, plate: ELEM.ui.searchPlate.value });
}

START_TABLE.onRowClick((startTableBean) => {
    //StartTableBean
});

RPC.startpageReady();
RPC.getStartpageTableByDate(selectedDate);
