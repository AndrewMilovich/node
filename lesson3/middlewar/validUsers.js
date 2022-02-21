function validUsers(req, res, next) {
    const {firstName, lastName, email, password, age, city} = req.body

    if (!firstName || !lastName || !email || !password || !age || !city) {
        throw new Error('input all fields').message
    }
    next()
}

module.exports = validUsers