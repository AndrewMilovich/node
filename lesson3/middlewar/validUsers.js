function validUsers(req, res, next) {

    const {firstName, lastName, email, password, age, city} = req.body

    try {
        if (!firstName || !lastName || !email || !password || !age || !city) {
            throw new Error('input all fields')
        }

        next()
    } catch (e) {
        res.status(400).send(e.message)
    }

}

module.exports = validUsers