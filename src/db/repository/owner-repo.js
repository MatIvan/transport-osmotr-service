//@ts-check
'use strict'

const UTIL = require('../db-util')
const SQL = require('../db-sql')

/**
 * @typedef {Object} Owner 
 * @property {number} id
 * @property {string} first_name
 * @property {string} second_name
 * @property {string} midle_name
 * @property {number} owner_type_id
 */


module.exports = {
    getById: selectById,
    save: save,
}

/**
 * @param {number} id
 * @param {(owner: Owner) => void} callback
 */
function selectById(id, callback) {
    UTIL.selectOne(SQL.selectOwnerById, [id], function (/** @type {Owner} */owner) {
        callback(owner);
    });
}

/**
 * @param {Owner} owner
 * @param {(owner:Owner)=>void} callback
 */
function save(owner, callback) {
    if (owner && owner.id > 0) {
        return update(owner, () => {
            callback(owner);
        });
    }
    insert(owner, (id) => {
        owner.id = id;
        callback(owner);
    });
}

/**
 * @param {Owner} owner
 * @param {()=>void} callback
 */
function update(owner, callback) {
    const ownerParams = [
        owner.first_name,
        owner.second_name,
        owner.midle_name,
        owner.owner_type_id,
        owner.id
    ];
    UTIL.update(SQL.sqlUpdateOwner, ownerParams, callback);
}

/**
 * @param {Owner} owner
 * @param {(ownerId:number)=>void} callback
 */
function insert(owner, callback) {
    const ownerParams = [
        owner.first_name,
        owner.second_name,
        owner.midle_name,
        owner.owner_type_id
    ];
    UTIL.insert(SQL.sqlInsertOwner, ownerParams, callback);
}
