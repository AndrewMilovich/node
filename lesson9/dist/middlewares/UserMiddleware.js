"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = void 0;
const userRepositories_1 = require("../repositories/user/userRepositories");
const userValidator_1 = require("../validator/userValidator");
// import { IUser } from '../interface/user.interface';
class UserMiddleware {
    async checkIsUserExist(req, res, next) {
        try {
            const userFromDb = userRepositories_1.userRepositories.getUserByEmail(req.body.email);
            if (!userFromDb) {
                res.status(400).json('User not found');
                return;
            }
            req.user = await userFromDb;
            next();
        }
        catch (e) {
            res.status(400).json(e);
        }
    }
    async validUser(req, res, next) {
        try {
            const { error, value } = userValidator_1.userValidator.createUser.validate(req.body);
            if (error) {
                throw new Error(error.details[0].message);
            }
            req.body = value;
            next();
        }
        catch (e) {
            res.status(400).json(e.message);
        }
    }
    async validLogin(req, res, next) {
        try {
            const { error, value } = userValidator_1.userValidator.loginUser.validate(req.body);
            if (error) {
                throw new Error('wrong email or password');
            }
            req.body = value;
            next();
        }
        catch (e) {
            res.status(400).json(e.message);
        }
    }
}
exports.userMiddleware = new UserMiddleware();
//# sourceMappingURL=UserMiddleware.js.map