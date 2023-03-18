//@ts-check
'use strict'

const UTIL = require('../db-util')
const SQL = require('../db-sql')

/**
 * @typedef {Object} Place
 * @property {number} id
 * @property {string} name
 * @property {string} address
 * @property {string} oto_number
 */

module.exports = {
    getById,
    getAll,
    save,
}

/**
 * @param {Place} place 
 * @param {(place:Place)=>void} callback 
 */
function save(place, callback) {
    if (place && place.id > 0) {
        return update(place, callback);
    }
    insert(place, callback);
}

/**
 * @param {Place} place
 * @param {(place:Place)=>void} callback
 */
function update(place, callback) {
    const params = [
        place.name,
        place.address,
        place.oto_number,
        place.id
    ];
    UTIL.update(SQL.sqlUpdatePlace, params, () => {
        callback(place);
    });
}

/**
 * @param {Place} place
 * @param {(place:Place)=>void} callback
 */
function insert(place, callback) {
    const params = [
        place.name,
        place.address,
        place.oto_number
    ];
    UTIL.insert(SQL.sqlInsertPlace, params, (placeId) => {
        place.id = placeId;
        callback(place);
    });
}

/**
 * @param {(data:Place[])=>void} callback 
 */
function getAll(callback) {
    UTIL.selectAll(SQL.selectAllPlace, [], callback);
}

/**
 * @param {number} id
 * @param {(data:Place)=>void} callback 
 */
function getById(id, callback) {
    UTIL.selectOne(SQL.selectPlace, [id], callback);
}
