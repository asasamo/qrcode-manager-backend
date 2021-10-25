// manage.js - Manage shortUrls

const express = require('express')
const router = express.Router()
const log = require('../misc/logger')

const slugSchema = require('../models/slug')

const checkId = require('../middlewares/checkId')

router.post('/new', (req, res) => {
    log.debug(`Create short url request from [${req.hostname}/${req.ip}]`)
    new slugSchema({
        title: req.body.title,
        longUrl: req.body.longUrl
    }).save((err, result) => {
        if (err) {
            log.error(err.message)
            res.status(400).send(err.message)
        } else {
            res.status(200).send({ id: result._id, title: result.title, shortUrl: result.shortUrl, enabled: result.enabled })
        }
    })
})

router.delete('/delete', checkId, async (req, res) => {
    log.debug(`Delete short url request from [${req.hostname}/${req.ip}]`)
    if (req.body.id == undefined) res.status(400).send('Nessun id specificato!')
    let slugFound = await slugSchema.findById(req.body.id)
    if (slugFound) {
        slugSchema.findByIdAndRemove(req.body.id, () => {
            res.status(200).send(`Eliminato id: ${slugFound._id}`)
        })
    } else { res.status(400).send('Id non trovato') }
})

router.post('/modify/title', checkId, async (req, res) => {
    log.debug(`Modify short url request from [${req.hostname}/${req.ip}]`)
    if (req.body.title == undefined) res.status(400).send('Nessun titolo specificato!')
    let slugFound = await slugSchema.findById(req.body.id)
    if (slugFound) {
        slugSchema.findByIdAndUpdate(req.body.id, { title: req.body.title || 'default' }, () => {
            res.status(200).send(`Modificato id: ${slugFound._id}`)
        })
    } else { res.status(400).send('Id non trovato') }
})

router.post('/modify/url', checkId, async (req, res) => {
    log.debug(`Modify short url request from [${req.hostname}/${req.ip}]`)
    if (req.body.url == undefined) res.status(400).send('Nessun URL specificato!')
    let slugFound = await slugSchema.findById(req.body.id)
    if (slugFound) {
        slugFound.longUrl = req.body.url
        slugFound.save((err) => {
            if (err) {
                res.status(400).send(err.message)
            } else {
                res.status(200).send(`Modificato id: ${slugFound._id}`)
            }
        })
    } else { res.status(400).send('Id non trovato') }
})

router.post('/modify/enabled', checkId, async (req, res) => {
    log.debug(`Modify short url request from [${req.hostname}/${req.ip}]`)
    if (req.body.title == undefined) res.status(400).send('Nessun titolo specificato!')
    let slugFound = await slugSchema.findById(req.body.id)
    if (slugFound) {
        slugSchema.findByIdAndUpdate(req.body.id, { title: req.body.title }, () => {
            res.status(200).send(`Modificato id: ${slugFound._id}`)
        })
    } else { res.status(400).send('Id non trovato') }
})


module.exports = router