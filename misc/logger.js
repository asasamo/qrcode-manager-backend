// logger.js - logger

const moment = require('moment')

module.exports.debug = (message) => {
    console.log(`[${moment().format('HH:mm:ss:SSS')}] - ${message}`)
}

module.exports.error = (message) => {
    console.log(`[${moment().format('HH:mm:ss:SSS')}] !! ${message}`)
}