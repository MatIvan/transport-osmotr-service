//@ts-check
'use strict';

const ELEM = require('./elements');
const RPC = require('../rpc');
const { setChangeHandler } = require('../elementsUtil');

/**
 * @typedef {import('../../properties').Properties} Properties
 * @typedef {import('../../src/db/repository/place-repo').Place} Place
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
    },
});

ELEM.ui.filterDate.value = selectedDate;
setChangeHandler(ELEM.ui.filterDate, () => {
    selectedDate = ELEM.ui.filterDate.value;
});

RPC.startpageReady();
