// serverConfig.js - Send all the necessary info for the management client

const express = require('express')
const config = require('../config.json')
const router = express.Router()

router.get('/', (req, res) => {
    log.debug(`Config request from [${req.hostname}/${req.ip}]`)
    let serverConfig = {
        env: process.env.NODE_ENV,
        domain: config.domain,
        port: config.PORT,
        slugLength: config.slugLength
    }
    res.status(200).json(serverConfig)
})

module.exports = router