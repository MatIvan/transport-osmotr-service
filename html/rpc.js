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

    // common
    getAtsType: (category) => channels.sendToDataBaseChannel('getAtsType', category),
    getTsCategory: () => channels.sendToDataBaseChannel('getTsCategory'),
    // @ts-ignore
    appVersions: window.versions,
}