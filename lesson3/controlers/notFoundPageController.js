class NotFoundPageController {

    renderNotFoundPage(req, res) {
        res.render('/notFoundUser');
    }
}

module.exports = new NotFoundPageController;