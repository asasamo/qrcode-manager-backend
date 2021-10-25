var mongoose = require('mongoose')
//const randomstring = require("randomstring")
const config = require('../config.json')

function isValidHttpUrl(string) {
    let url

    try {
        url = new URL(string)
    } catch (_) {
        return false
    }

    return url.protocol === "http:" || url.protocol === "https:"
}

function genNewSlug() {
    return require("randomstring").generate({ length: config.slugLength, charset: 'alphabetic' })
}

const slugSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Nessun titolo specificato!']
    },
    longUrl: {
        type: String,
        required: [true, 'Nessun URL specificato!'],
        validate: {
            validator: function (v) {
                return isValidHttpUrl(v)
            },
            message: 'URL non valido!'
        }
    },
    shortUrl: {
        type: String,
        unique: true,
        default: genNewSlug
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    enabled: {
        type: Boolean,
        default: true
    }
})

slugSchema.methods.modifyLongUrl = (newLong) => {
    this.longUrl = newLong
    return { id: this._id, newLong: this.longUrl }
}

slugSchema.methods.setStatus = (status) => {
    switch (status) {
        case 'enabled':
            this.enabled = true
            break
        case 'disabled':
            this.enabled = false
            break
        default:
            break
    }
    return this.enabled
}


module.exports = mongoose.model('slug', slugSchema, 'slugs')