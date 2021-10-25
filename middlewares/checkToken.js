// checkToken.js - Check if API Token is valid

const AUTH_TOKEN = process.env.AUTH_TOKEN

var checkToken = (req, res, next) => {
    if (req.headers['auth-token'] == AUTH_TOKEN) {
        next()
    } else {
        res.status(401).send('Invalid API Token.')
    }
}

module.exports = checkToken