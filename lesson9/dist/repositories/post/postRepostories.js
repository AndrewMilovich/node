"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRepositories = void 0;
const typeorm_1 = require("typeorm");
const post_1 = require("../../entity/post");
let PostRepositories = class PostRepositories {
    async getPosts() {
        return (0, typeorm_1.getManager)()
            .getRepository(post_1.Post)
            .find();
    }
    async getPostById(userId) {
        return (0, typeorm_1.getManager)()
            .getRepository(post_1.Post)
            .find({ userId });
    }
    async updatePost(post, userId) {
        const { text } = post;
        return (0, typeorm_1.getManager)()
            .getRepository(post_1.Post)
            .update({ userId }, { text });
    }
};
PostRepositories = __decorate([
    (0, typeorm_1.EntityRepository)(post_1.Post)
], PostRepositories);
exports.postRepositories = new PostRepositories();
//# sourceMappingURL=postRepostories.js.map