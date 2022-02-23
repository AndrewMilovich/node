const users = require('../db/users')

class DeleteController {
    renderDelete(req, res) {
        const {userId} = req.params;
        const index = users.findIndex(value => value.id === userId)
        users.splice(index, 1);
        res.redirect('/users');
    }
}

module.exports = new DeleteController;