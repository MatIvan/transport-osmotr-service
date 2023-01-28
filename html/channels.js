//@ ts-check
'use strict';

module.exports = {
    MAIN: 'onMainChannel',
    DB: 'onDatabaseChannel',
    bind: (channelName, handler) => {
        window.handlers[channelName]((cmd, data) => {
            console.log(channelName + ': ', cmd, data);
            const func = handler[cmd];
            if (typeof func === 'function') {
                func(data);
            }
        })
    },

    sendToMainChannel: (command, params) => {
        window.service.sendToMainChannel(command, params);
    },

    sendToDataBaseChannel: (command, params, callback) => {
        window.service.sendToDataBaseChannel(command, params);
    }
}