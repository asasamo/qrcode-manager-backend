if (process.env.NODE_ENV != 'production') require('dotenv').config()
if (!process.env.AUTH_TOKEN) {
    log.error(`API token not set, here's one for you ${require('crypto').randomBytes(20).toString("base64url")}`)
    process.exit(1)
}

const config = require('./config.json')
const log = require('./misc/logger')

const mongoose = require('mongoose')

const options = [...config.MongoDB.matchAll(RegExp(/%%\w+%%/g))]

options.forEach(e => {
    let property = e[0].replaceAll('%', '')

    config.MongoDB = config.MongoDB.replace(e[0], process.env[property.toUpperCase()])
})

mongoose.connect(config.MongoDB,
    { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
        if (err) {
            log.error(err)
            process.exit(1)
        } else {
            log.debug('MongoDB connected!')
        }
    })

const express = require('express')
const bodyParser = require('body-parser')

const app = express()

// Routes
var manageSlug = require('./routes/manage')
var root = require('./routes/root')
var slug = require('./routes/slug')

// Middlewares
var checkToken = require('./middlewares/checkToken')

app.use(bodyParser.json())

app.use('/info', checkToken, root)
app.use('/to', slug)
app.use('/manage', checkToken, manageSlug)

app.listen(config.PORT)
log.debug(`Server running on port ${config.PORT}!`)