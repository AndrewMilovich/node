const {Router} = require('express');
const ErrorPageController=require('../controlers/errorPageController')
const errorPageRouter = Router();

errorPageRouter.get('/',ErrorPageController.renderErrorPage)

module.exports = errorPageRouter;