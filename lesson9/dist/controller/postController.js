"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postController = void 0;
const services_1 = require("../services");
class PostController {
    async getPosts(req, res) {
        const getUser = await services_1.postService.getPosts();
        return res.json(getUser);
    }
    async getPostById(req, res) {
        const userId = Number(req.params.userId);
        const getPost = await services_1.postService.getPostById(userId);
        return res.json(getPost);
    }
    async updatePost(req, res) {
        const userId = Number(req.params.userId);
        const getPosts = await services_1.postService.updatePost(req.body, userId);
        return res.json(getPosts);
    }
}
exports.postController = new PostController();
//# sourceMappingURL=postController.js.map