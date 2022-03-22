import { Request, Response } from 'express';
import { IPost } from '../interface/post.interface';
import { postService } from '../services';

class PostController {
    public async getPosts(req: Request, res: Response): Promise<Response<IPost>> {
        const getUser = await postService.getPosts();
        return res.json(getUser);
    }

    public async getPostById(
        req: { params: { userId: string; }; },
        res: Response,
    ):Promise<Response<IPost>> {
        const userId = Number(req.params.userId);
        const getPost = await postService.getPostById(userId);
        return res.json(getPost);
    }

    public async updatePost(
        req: { params: { userId: any; }; body: IPost; },
        res: {
            json: (arg0: IPost) =>
                Response<IPost, Record<string, any>> |
                PromiseLike<Response<IPost, Record<string, any>>>;
        },
    ): Promise<Response<IPost>> {
        const userId = Number(req.params.userId);
        const getPosts = await postService.updatePost(req.body, userId);
        return res.json(getPosts);
    }
}

export const postController = new PostController();
