const {Router} = require('express');
const notFoundPageController=require('../controlers/notFoundPageController')
const notFoundUserRouter = Router();

notFoundUserRouter.get('/',notFoundPageController.renderNotFoundPage)

module.exports = notFoundUserRouter;