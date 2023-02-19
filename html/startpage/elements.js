//@ts-check
'use strict';

const { getDiv, getInput } = require('../elementsUtil');

module.exports = {
    ui: {
        caption: getDiv('caption'),
    },
    versionInfo: getDiv('info'),
}
