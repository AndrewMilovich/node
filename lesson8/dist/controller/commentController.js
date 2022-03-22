"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentController = void 0;
const services_1 = require("../services");
class CommentController {
    async getComments(req, res) {
        const getUser = await services_1.commentService.getComments();
        return res.json(getUser);
    }
    async getCommentById(req, res) {
        const userId = Number(req.params.userId);
        const getCommentById = await services_1.commentService.getCommentById(userId);
        return res.json(getCommentById);
    }
    async updateCommentAction(req, res) {
        const id = Number(req.body.id);
        const updateCommentAction = await services_1.commentService.updateCommentAction(req.body.action, id);
        return res.json(updateCommentAction);
    }
}
exports.commentController = new CommentController();
//# sourceMappingURL=commentController.js.map