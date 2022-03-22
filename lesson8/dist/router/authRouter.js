"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const controller_1 = require("../controller");
const middlewares_1 = require("../middlewares");
const route = (0, express_1.Router)();
route.post('/registration', controller_1.authController.registration);
route.post('/login', middlewares_1.userMiddleware.checkIsUserExist, controller_1.authController.login);
route.post('/logout', middlewares_1.authMiddleware.checkAccessToken, controller_1.authController.logout);
// route.post('/refresh', authController.refreshing);
exports.authRouter = route;
//# sourceMappingURL=authRouter.js.map