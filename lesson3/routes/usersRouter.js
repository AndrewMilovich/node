const {Router} = require('express')
const UsersController = require('../controlers/usersController')
const DeleteControllers=require('../controlers/deleteController')
const usersRouter = Router();

usersRouter.get('/', UsersController.renderUsers);
usersRouter.get('/:userId', UsersController.renderById);
usersRouter.post('/:userId/delete',DeleteControllers.renderDelete)

module.exports = usersRouter;