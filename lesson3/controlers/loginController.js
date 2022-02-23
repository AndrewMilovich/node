const users = require('../db/users')

class LoginController {

    renderLogin(req, res) {
        res.render('login');
    }

    renderLoginPost(req, res) {
        users.push({...req.body, id: new Date().getTime()});
        res.redirect('/users')

    }

}

module.exports = new LoginController()