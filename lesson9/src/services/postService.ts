import { IPost } from '../interface/post.interface';
import { postRepositories } from '../repositories/post/postRepostories';

class PostService {
    public async getPosts():Promise<IPost[]> {
        return postRepositories.getPosts();
    }

    public async getPostById(userId:number):Promise<IPost> {
        return postRepositories.getPostById(userId);
    }

    public async updatePost(post:IPost, id:number):Promise<IPost> {
        return postRepositories.updatePost(post, id);
    }
}
export const postService = new PostService();
