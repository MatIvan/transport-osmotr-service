//@ts-check
'use strict';

const channels = require('./channels');

module.exports = {
    bind: (handler) => {
        channels.bind(channels.MAIN, handler);
        channels.bind(channels.DB, handler);
    },

    // from startpage
    startpageReady: () => channels.sendToMainChannel('startpageReady'),
    onEditTs: (tsId) => channels.sendToMainChannel('onEditTs', tsId),

    // from edit-ts-page
    getTsForEdit: () => channels.sendToMainChannel('getTsForEdit'),
    saveTs: (ts) => channels.sendToDataBaseChannel('saveTs', ts),

    // common
    showStartPage: () => channels.sendToMainChannel('showStartPage'),

    // common DB
    getAtsType: (category) => channels.sendToDataBaseChannel('getAtsType', category),
    getTsCategory: () => channels.sendToDataBaseChannel('getTsCategory'),
    getTsEngineType: () => channels.sendToDataBaseChannel('getTsEngineType'),
    getOwnerType: () => channels.sendToDataBaseChannel('getOwnerType'),
    getDocType: () => channels.sendToDataBaseChannel('getDocType'),
    // @ts-ignore
    appVersions: window.versions,
}
