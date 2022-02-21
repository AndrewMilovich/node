const {Router} = require('express');
const SignInController = require('../controlers/signInController')
const signInRouter = Router();

signInRouter.get('/', SignInController.renderSignInGet)
signInRouter.post('/', SignInController.renderSignInPost)

module.exports = signInRouter;