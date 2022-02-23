const users = require('../db/users')

class SignInController {

    renderSignInGet(req, res) {
        res.render('signIn');
    }

    renderSignInPost(req, res) {

        const user = users.find(value => value.email === req.body.email && value.password === req.body.password);

        if (user) {
            res.render('user', {user});
            return
        }
            res.render('notFoundUser');
    }
}

module.exports = new SignInController()