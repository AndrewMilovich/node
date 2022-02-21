const {Router} = require('express');
const LoginController = require('../controlers/loginController')
const usersValid=require('../middlewar/validUsers')
const validEmail = require("../middlewar/validEmail");
const loginRouter = Router();

loginRouter.get('/', LoginController.renderLogin)
loginRouter.post('/',usersValid,validEmail,LoginController.renderLoginPost)

module.exports = loginRouter;