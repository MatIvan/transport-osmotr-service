//@ts-check
'use strict';

const dbService = require('../db/db-service');

module.exports.name = 'main-channel';

module.exports.startpageReady = (params, callback) => {
    dbService.open();
}
