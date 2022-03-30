// list.js - Get slugs list

const express = require('express')
const router = express.Router()
const log = require('../misc/logger')

const slugSchema = require('../models/slug')


router.get('/', async (req, res) => {
    log.debug(`List request from [${req.hostname}/${req.ip}]`)
    let slugs = await slugSchema.find({})

    res.status(200).json(slugs)
})

module.exports = router