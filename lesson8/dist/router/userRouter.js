"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const controller_1 = require("../controller");
const router = (0, express_1.Router)();
router.post('/', controller_1.userController.createdUser);
router.post('/email', controller_1.userController.getUserByEmail);
router.get('/', controller_1.userController.getUser);
router.get('/:id', controller_1.userController.getUserById);
router.patch('/:id', controller_1.userController.updateUser);
router.delete('/:id', controller_1.userController.deleteUser);
exports.userRouter = router;
//# sourceMappingURL=userRouter.js.map