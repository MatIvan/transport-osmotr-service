//@ts-check
'use strict';

const RPC = require('../rpc');
const ELEM = require('./elements');
const VIEW = require('./staff-page-view');

RPC.bind({
    /**
     * @param {string} msg
     */
    databaseError: (msg) => {
        alert('ОШИБКА !!!\n\n' + msg);
    },

});

VIEW.prepareElements();

loadLists();

ELEM.ui.btnCancel.onclick = () => {
    RPC.showStartPage();
}

function refreshAll() {
    VIEW.refreshAll();
}

function loadLists() {

}
