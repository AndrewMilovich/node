function validEmail(req, res, next) {

    const users = require('../db/users')
    const {email} = req.body
    let find = users.find(value => value.email === email);
    if (find) {
        throw new Error('this email is already exist').message
    }
    next()
}

module.exports = validEmail