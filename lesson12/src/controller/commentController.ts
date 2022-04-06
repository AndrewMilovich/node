import { Request, Response } from 'express';
import { IPost } from '../interface/post.interface';
import { commentService } from '../services';
import { IComments } from '../interface/comments.interface';

class CommentController {
    public async getComments(req: Request, res: Response): Promise<Response<IPost>> {
        const getUser = await commentService.getComments();
        return res.json(getUser);
    }

    public async getCommentById(
        req: { params: { userId: string; }; },
        res: Response,
    ):Promise<Response<IComments>> {
        const userId = Number(req.params.userId);
        const getCommentById = await commentService.getCommentById(userId);
        return res.json(getCommentById);
    }

    public async updateCommentAction(req:{body:{action:string, id:string} }, res:Response)
        :Promise<Response<IComments>> {
        const id = Number(req.body.id);
        const updateCommentAction = await commentService.updateCommentAction(req.body.action, id);
        return res.json(updateCommentAction);
    }
}

export const commentController = new CommentController();
