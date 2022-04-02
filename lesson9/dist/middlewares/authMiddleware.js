"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const services_1 = require("../services");
const tokenRepository_1 = require("../repositories/token/tokenRepository");
const ErrorHandler_1 = require("../error/ErrorHandler");
class AuthMiddleware {
    async checkAccessToken(req, res, next) {
        try {
            const authToken = req.get('Authorization');
            if (!authToken) {
                next(new ErrorHandler_1.ErrorHandler('no token', 404));
                return;
            }
            const { userEmail } = services_1.tokenService.verifyToken(authToken);
            const tokenPairFromDb = await tokenRepository_1.tokenRepository.findByParams({ accessToken: authToken });
            if (!tokenPairFromDb) {
                next(new ErrorHandler_1.ErrorHandler('no token', 404));
            }
            const userFromToken = await services_1.userService.getUserByEmail(userEmail);
            if (!userFromToken) {
                next(new ErrorHandler_1.ErrorHandler('no token', 404));
                return;
            }
            req.user = userFromToken;
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async checkRefreshToken(req, res, next) {
        try {
            const authToken = req.get('Authorization');
            if (!authToken) {
                next(new ErrorHandler_1.ErrorHandler('no token', 404));
                return;
            }
            const { userEmail } = services_1.tokenService.verifyToken(authToken, 'refresh');
            const tokenPairFromDb = await tokenRepository_1.tokenRepository.findByParams({ refreshToken: authToken });
            if (!tokenPairFromDb) {
                next(new ErrorHandler_1.ErrorHandler('no token', 404));
                return;
            }
            const userFromToken = await services_1.userService.getUserByEmail(userEmail);
            if (!userFromToken) {
                next(new ErrorHandler_1.ErrorHandler('no token', 404));
                return;
            }
            req.user = userFromToken;
            next();
        }
        catch (e) {
            next(e);
        }
    }
}
exports.authMiddleware = new AuthMiddleware();
//# sourceMappingURL=authMiddleware.js.map