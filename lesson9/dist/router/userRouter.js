"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const controller_1 = require("../controller");
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
router.get('/', controller_1.userController.getUser);
router.get('/:id', controller_1.userController.getUserById);
router.patch('/:id', middlewares_1.userMiddleware.validId, middlewares_1.userMiddleware.validUser, controller_1.userController.updateUser);
router.delete('/:id', middlewares_1.userMiddleware.validId, controller_1.userController.deleteUser);
exports.userRouter = router;
//# sourceMappingURL=userRouter.js.map