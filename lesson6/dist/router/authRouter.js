"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const controller_1 = require("../controller");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const route = (0, express_1.Router)();
route.post('/registration', controller_1.authController.registration);
route.post('/logout', authMiddleware_1.authMiddleware.checkAccessToken, controller_1.authController.logout);
// route.post('/login', authController.logination);
// route.post('/refresh', authController.refreshing);
exports.authRouter = route;
//# sourceMappingURL=authRouter.js.map