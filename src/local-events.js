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
    CLI: {
        READY: "cli-ready",
        ERROR: "cli-error",
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
