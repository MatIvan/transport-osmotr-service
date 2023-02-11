//@ts-check
'use strict';

const channels = require('./channels');

/**
 * @typedef {import('../src/db/db-service').Ts} Ts
 * @typedef {import('../src/db/repository/place-repo').Place} Place
 * @typedef {import('../src/db/repository/staff-repo').Staff} Staff
 */

module.exports = {
    bind: (handler) => {
        channels.bind(channels.MAIN, handler);
        channels.bind(channels.DB, handler);
    },

    // from startpage
    startpageReady: () => channels.sendToMainChannel('startpageReady'),
    /**
     * @param {number} tsId 
     */
    onEditTs: (tsId) => channels.sendToMainChannel('onEditTs', tsId),

    getTsForEdit: () => channels.sendToMainChannel('getTsForEdit'),
    /**
     * @param {Ts} ts 
     */
    saveTs: (ts) => channels.sendToDataBaseChannel('saveTs', ts),

    /**
     * @param {Place} place
     */
    savePlace: (place) => channels.sendToDataBaseChannel('savePlace', place),

    /**
     * @param {Staff} staff
     */
    saveStaff: (staff) => channels.sendToDataBaseChannel('saveStaff', staff),

    // common
    showStartPage: () => channels.sendToMainChannel('showStartPage'),

    // common DB
    getAtsType: () => channels.sendToDataBaseChannel('getAtsType'),
    getTsCategory: () => channels.sendToDataBaseChannel('getTsCategory'),
    getTsEngineType: () => channels.sendToDataBaseChannel('getTsEngineType'),
    getOwnerType: () => channels.sendToDataBaseChannel('getOwnerType'),
    getDocType: () => channels.sendToDataBaseChannel('getDocType'),
    getAllPlace: () => channels.sendToDataBaseChannel('getAllPlace'),
    getAllStaff: () => channels.sendToDataBaseChannel('getAllStaff'),
    // @ts-ignore
    appVersions: window.versions,
}
