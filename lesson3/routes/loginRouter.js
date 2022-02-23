const {Router} = require('express');
const LoginController = require('../controlers/loginController')
const validUsers=require('../middlewar/validUsers')
const validEmail = require("../middlewar/validEmail");
const loginRouter = Router();

loginRouter.get('/', LoginController.renderLogin)
loginRouter.post('/',validUsers,validEmail,LoginController.renderLoginPost)

module.exports = loginRouter;