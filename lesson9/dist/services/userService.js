"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = require("../config/config");
const userRepositories_1 = require("../repositories/user/userRepositories");
class UserService {
    async createUser(user) {
        const { password } = user;
        const hashedPassword = await this._hashPassword(password);
        const dataToSave = { ...user, password: hashedPassword };
        return userRepositories_1.userRepositories.createUser(dataToSave);
    }
    async getUser() {
        return userRepositories_1.userRepositories.getUser();
    }
    async getUserById(id) {
        return userRepositories_1.userRepositories.getUserById(id);
    }
    async getUserByEmail(email) {
        return userRepositories_1.userRepositories.getUserByEmail(email);
    }
    async updateUser(user, id) {
        return userRepositories_1.userRepositories.updateUser(user, id);
    }
    async deleteUser(id) {
        return userRepositories_1.userRepositories.deleteUser(id);
    }
    async _hashPassword(password) {
        return bcrypt_1.default.hash(password, Number(config_1.config.USER_SALT_ROUNDS));
    }
}
exports.userService = new UserService();
//# sourceMappingURL=userService.js.map