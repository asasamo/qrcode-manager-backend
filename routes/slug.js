// slug.js - Search and redirect to longUrl

const express = require('express')
const router = express.Router()
const log = require('../misc/logger')

const slugSchema = require('../models/slug')

const sanitizeSlug = require('../middlewares/sanitizeSlug')

router.get('/:slug', sanitizeSlug, async (req, res) => {
    log.debug(`New redirect requested with slug [${req.params.slug}] from [${req.ip}]`)
    let slugFound = await slugSchema.findOne({ shortUrl: req.params.slug })
    if (slugFound) {
        res.status(301).send(`<meta http-equiv="refresh" content="0; url='${slugFound.longUrl}'" />`)
    } else { res.status(404).send('Indirizzo non trovato') }
})

module.exports = router