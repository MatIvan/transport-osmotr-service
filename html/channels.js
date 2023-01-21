//@ts-check
'use strict';

module.exports.MAIN = 'onMainChannel';
module.exports.DB = 'onDatabaseChannel';

module.exports.bind = (channelName, handler) => {
    // @ts-ignore
    window.handlers[channelName]((cmd, data) => {
        console.log(channelName + ': ', cmd, data);
        const func = handler[cmd];
        if (typeof func === 'function') {
            func(data);
        }
    });
}
