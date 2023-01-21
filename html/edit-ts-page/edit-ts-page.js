//@ts-check
'use strict';

bindHandlers();

window.service.sendToDataBaseChannel('getTsCategory');

function bindHandlers() {
    window.handlers.onMainChannel((cmd, data) => {
        console.log('onMainChannel: ', cmd, data);
    });

    window.handlers.onDatabaseChannel((cmd, data) => {
        console.log('onDatabaseChannel: ', cmd, data);
    });
}
