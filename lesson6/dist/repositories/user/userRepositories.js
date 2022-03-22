"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepositories = void 0;
const typeorm_1 = require("typeorm");
const user_1 = require("../../entity/user");
let UserRepositories = class UserRepositories extends typeorm_1.Repository {
    async createUser(user) {
        return (0, typeorm_1.getManager)()
            .getRepository(user_1.User)
            .save(user);
    }
    async getUserById(id) {
        return (0, typeorm_1.getManager)()
            .getRepository(user_1.User)
            .find({ id });
    }
    async getUserByEmail(email) {
        return (0, typeorm_1.getManager)()
            .getRepository(user_1.User)
            .createQueryBuilder('user')
            .where('user.email=:email', { email })
            .getOne();
    }
    async getUser() {
        return (0, typeorm_1.getManager)()
            .getRepository(user_1.User)
            .find();
    }
    async updateUser(user, id) {
        const { email, password } = user;
        return (0, typeorm_1.getManager)()
            .getRepository(user_1.User)
            .update({ id }, { email, password });
    }
    async deleteUser(id) {
        return (0, typeorm_1.getManager)()
            .getRepository(user_1.User)
            .softDelete({ id });
    }
};
UserRepositories = __decorate([
    (0, typeorm_1.EntityRepository)(user_1.User)
], UserRepositories);
exports.userRepositories = new UserRepositories();
//# sourceMappingURL=userRepositories.js.map