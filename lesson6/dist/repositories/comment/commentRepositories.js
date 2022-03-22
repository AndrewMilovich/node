"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentRepositories = void 0;
const typeorm_1 = require("typeorm");
const http = __importStar(require("http"));
const comment_1 = require("../../entity/comment");
class CommentRepositories {
    async getComments() {
        return (0, typeorm_1.getManager)()
            .getRepository(comment_1.Comment)
            .find();
    }
    async getCommentById(userId) {
        return (0, typeorm_1.getManager)()
            .getRepository(comment_1.Comment)
            .createQueryBuilder('comment')
            .where('comment.authorId = :id', { userId })
            .leftJoinAndSelect('comment.user', 'user')
            .leftJoinAndSelect('comment.post', 'post')
            .getMany();
    }
    async updateCommentsAction(action, id) {
        try {
            const comment = await (0, typeorm_1.getManager)()
                .getRepository(comment_1.Comment)
                .createQueryBuilder('comment')
                .where(`comment.id=${id}`)
                .getOne();
            if (!comment) {
                return 'wrong id comment';
            }
            if (action === 'like') {
                await (0, typeorm_1.getManager)()
                    .getRepository(comment_1.Comment)
                    .update({ id }, { like: comment.like + 1 });
            }
            if (action === 'dislike') {
                await (0, typeorm_1.getManager)()
                    .getRepository(comment_1.Comment)
                    .update({ id }, { dislike: comment.dislike + 1 });
            }
            return http.STATUS_CODES['201'];
        }
        catch (e) {
            return e.messages;
        }
    }
}
exports.commentRepositories = new CommentRepositories();
//# sourceMappingURL=commentRepositories.js.map