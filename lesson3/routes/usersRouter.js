const {Router} = require('express')
const UsersController = require('../controlers/usersController')

const usersRouter = Router();

usersRouter.get('/', UsersController.renderUsers);
usersRouter.get('/:userId', UsersController.renderById);

module.exports = usersRouter;