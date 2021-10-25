// checkId.js - Check if Id is valid

var checkId = (req, res, next) => {
    if (req.body.id && req.body.id.length == 24 && /[0-9A-Fa-f]/g.test(req.body.id)) {
        next()
    } else {
        res.status(400).send('Id non valido o non specificato!')
    }
}

module.exports = checkId