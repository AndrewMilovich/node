import { IComments } from '../interface/comments.interface';
import { commentRepositories } from '../repositories/comment/commentRepositories';

class CommentService {
    public async getComments(): Promise<IComments[]> {
        return commentRepositories.getComments();
    }

    public async getCommentById(userId:number):Promise<IComments> {
        return commentRepositories.getCommentById(userId);
    }

    public async updateCommentAction(action:string, id:number):Promise<IComments> {
        return commentRepositories.updateCommentsAction(action, id);
    }
}
export const commentService = new CommentService();
