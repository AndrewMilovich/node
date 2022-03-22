"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentService = void 0;
const commentRepositories_1 = require("../repositories/comment/commentRepositories");
class CommentService {
    async getComments() {
        return commentRepositories_1.commentRepositories.getComments();
    }
    async getCommentById(userId) {
        return commentRepositories_1.commentRepositories.getCommentById(userId);
    }
    async updateCommentAction(action, id) {
        return commentRepositories_1.commentRepositories.updateCommentsAction(action, id);
    }
}
exports.commentService = new CommentService();
//# sourceMappingURL=commentService.js.map