//@ts-check
'use strict'

const { EventEmitter } = require('node:events')
class LocalEventEmitter extends EventEmitter { }

const emitter = new LocalEventEmitter()
module.exports = {
    APP: {
        READY: "app-ready",
    },
    DB: {
        OPEN: "db-open",
        ERROR: "db-error",
    },
    TO_CLI: { //events from main process to client renderer
        READY: "to-cli-ready",
        ERROR: "to-cli-error",
        DB: {
            CARS: 'to-cli-db-cars',
        },
    },
    TO_MAIN: {
        WIN_startpage: {
            READY: 'startpage-win-ready',
        },
        DB: {
            GET_CARS: 'db-get-cars',
        }
    },
    emit: (eventName, ...args) => {
        console.log("EMIT: ", eventName, args)
        return emitter.emit(eventName, args)
    },
    on: (eventName, listener) => {
        console.log("LIST: ", eventName)
        return emitter.on(eventName, listener)
    }
}
