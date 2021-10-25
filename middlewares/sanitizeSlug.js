// sanitizeSlug.js - Sanitize slug

const sanitize = new RegExp(/^[A-Za-z]+$/)
const config = require('../config.json')

var sanitizeSlug = (req, res, next) => {
    if (req.params.slug.length === config.slugLength && sanitize.test(req.params.slug)) {
        next()
    } else {
        res.status(400).send('Indirizzo non valido')
    }
}

module.exports = sanitizeSlug