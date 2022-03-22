"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postService = void 0;
const postRepostories_1 = require("../repositories/post/postRepostories");
class PostService {
    async getPosts() {
        return postRepostories_1.postRepositories.getPosts();
    }
    async getPostById(userId) {
        return postRepostories_1.postRepositories.getPostById(userId);
    }
    async updatePost(post, id) {
        return postRepostories_1.postRepositories.updatePost(post, id);
    }
}
exports.postService = new PostService();
//# sourceMappingURL=postService.js.map