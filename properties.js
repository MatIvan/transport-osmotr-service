//@ts-check
'use strict'

const FS = require('fs');

/**
 * @typedef {Object} Properties 
 * @property {number} placeId
 */

/**
 * @type Properties
 */
var props = {
    placeId: -1
};

function getProps() {
    return props;
}

module.exports = {
    load: (callback) => {
        FS.readFile("properties.json", "utf-8", (err, data) => {
            if (err) return console.log("PROPS: ERROR: ", JSON.stringify(err));
            props = JSON.parse(data);
            console.log("PROPS: ", props);
            if (callback) callback();
        })
    },
    save: (callback) => {
        FS.writeFile("properties.json", JSON.stringify(props), (err) => {
            if (err) return console.log("PROPS: ERROR: ", JSON.stringify(err));
            console.log("PROPS: Successfully Written to File.");
            if (callback) callback();
        });
    },
    get: () => { return props; }
}
