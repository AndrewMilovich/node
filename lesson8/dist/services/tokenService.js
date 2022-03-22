"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const tokenRepository_1 = require("../repositories/token/tokenRepository");
const config_1 = require("../config/config");
class TokenService {
    generateTokenPair(payload) {
        const accessToken = jsonwebtoken_1.default.sign(payload, config_1.config.SECRET_ACCESS_KEY, { expiresIn: '15m' });
        const refreshToken = jsonwebtoken_1.default.sign(payload, config_1.config.EXPIRES_IN_REFRESH, { expiresIn: '1d' });
        return {
            accessToken,
            refreshToken,
        };
    }
    async saveToken(userId, refreshToken, accessToken) {
        const tokenFromDb = await tokenRepository_1.tokenRepository.findTokenByUserId(userId);
        if (tokenFromDb) {
            tokenFromDb.refreshToken = refreshToken;
            tokenFromDb.accessToken = accessToken;
            return tokenRepository_1.tokenRepository.createToken(tokenFromDb);
        }
        const token = await tokenRepository_1.tokenRepository.createToken({ refreshToken, accessToken, userId });
        return token;
    }
    verifyToken(authToken, tokenType = 'access') {
        let secretWorld = config_1.config.SECRET_ACCESS_KEY;
        if (tokenType === 'refresh') {
            secretWorld = config_1.config.EXPIRES_IN_REFRESH;
        }
        return jsonwebtoken_1.default.verify(authToken, secretWorld);
    }
    async deleteToken(userId) {
        return tokenRepository_1.tokenRepository.deleteByParams({ userId });
    }
}
exports.tokenService = new TokenService();
//# sourceMappingURL=tokenService.js.map