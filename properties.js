//@ts-check
'use strict'
const path = require('path');
const FS = require('fs');

/**
 * @typedef {Object} Properties 
 * @property {number} placeId
 */

/**
 * @type Properties
 */
const PROPS_DEFAULT = {
    placeId: 1
};

/**
 * @type Properties
 */
var props = PROPS_DEFAULT;

const FILE_NAME = path.join(global.appRoot, "properties.json");

module.exports = {
    load,
    save,
    get
}

/**
 * @returns {Properties}
 */
function get() {
    return props;
}

/**
 * @param {() => void} callback
 */
function load(callback) {
    console.log("PROPS load: reading: ", FILE_NAME);
    FS.readFile(FILE_NAME, "utf-8", (err, data) => {
        if (err) {
            console.log("PROPS load: ERROR: ", JSON.stringify(err));
            console.log("PROPS load: create default...");
            save(callback);
            return;
        }
        props = JSON.parse(data);
        console.log("PROPS load: ", props);
        if (callback) callback();
    })
}

/**
 * @param {() => void} callback
 */
function save(callback) {
    FS.writeFile(FILE_NAME, JSON.stringify(props), (err) => {
        if (err) return console.log("PROPS save: ERROR: ", JSON.stringify(err));
        console.log("PROPS save: Successfully Written to File.");
        if (callback) callback();
    });
}