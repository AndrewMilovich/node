const users = require("../db/users");

function validEmail(req, res, next) {
    try {
        const users = require('../db/users')
        const {email} = req.body
        let find = users.find(value => value.email === email);
        if (find) {
            throw new Error('this email is already exist ')
        }
        next()
    } catch (e) {
        res.status(400).send(e.message)
    }


}

module.exports = validEmail