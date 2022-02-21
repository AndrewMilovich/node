const users = require('../db/users')

class LoginController {

    renderLogin(req, res) {
        res.render('login');
    }

    renderLoginPost(req, res) {
        const filterEmail = users.find(value => value.email === req.body.email)
        if (filterEmail) {
            res.redirect('/errorPage');
            return;
        }

        users.push({...req.body, id: users.length + 1});
        res.redirect('/users')

    }

}

module.exports = new LoginController()