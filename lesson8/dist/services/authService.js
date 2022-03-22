"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const userService_1 = require("./userService");
const tokenService_1 = require("./tokenService");
class AuthService {
    async registration(body) {
        const { email } = body;
        const userFromDb = await userService_1.userService.getUserByEmail(email);
        if (userFromDb) {
            throw new Error(`User with email: ${email} already exists`);
        }
        const createdUser = await userService_1.userService.createUser(body);
        return this._getTokenData(createdUser);
    }
    async comparePassword(password, hash) {
        const isPasswordUnique = await bcrypt_1.default.compare(password, hash);
        if (!isPasswordUnique) {
            throw new Error('user exist');
        }
    }
    async _getTokenData(userData) {
        const { id, email } = userData;
        const tokensPair = await tokenService_1.tokenService.generateTokenPair({ userId: id, userEmail: email });
        await tokenService_1.tokenService.saveToken(id, tokensPair.refreshToken, tokensPair.accessToken);
        return {
            ...tokensPair,
            userId: id,
            userEmail: email,
        };
    }
}
exports.authService = new AuthService();
//# sourceMappingURL=authService.js.map