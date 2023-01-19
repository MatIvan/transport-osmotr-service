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
    emit: (eventName, data) => {
        console.log("EMIT: ", eventName, data)
        return emitter.emit(eventName, data)
    },
    on: (eventName, listener) => {
        console.log("LIST: ", eventName)
        return emitter.on(eventName, listener)
    }
}
