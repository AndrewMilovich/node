"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const services_1 = require("../services");
const tokenRepository_1 = require("../repositories/token/tokenRepository");
class AuthMiddleware {
    async checkAccessToken(req, res, next) {
        try {
            const authToken = req.get('Authorization');
            if (!authToken) {
                throw new Error('no token');
            }
            const { userEmail } = services_1.tokenService.verifyToken(authToken);
            const tokenPairFromDb = await tokenRepository_1.tokenRepository.findByParams({ accessToken: authToken });
            if (!tokenPairFromDb) {
                throw new Error('no token');
            }
            const userFromToken = await services_1.userService.getUserByEmail(userEmail);
            if (!userFromToken) {
                throw new Error('wrong token');
            }
            req.user = userFromToken;
            next();
        }
        catch (e) {
            res.json({
                status: 401,
                message: e.message,
            });
        }
    }
}
exports.authMiddleware = new AuthMiddleware();
//# sourceMappingURL=authMiddleware.js.map