const {Router} = require('express');
const DeleteController=require('../controlers/deleteController')
const deleteRouter = Router();

deleteRouter.post('/',DeleteController.renderDelete)

module.exports = deleteRouter;