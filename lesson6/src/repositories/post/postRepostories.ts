import { EntityRepository, getManager } from 'typeorm';
import { Post } from '../../entity/post';
import { IPost } from '../../interface/post.interface';

@EntityRepository(Post)
class PostRepositories {
    public async getPosts():Promise<IPost[]> {
        return getManager()
            .getRepository(Post)
            .find();
    }

    public async getPostById(userId:number):Promise<any> {
        return getManager()
            .getRepository(Post)
            .find({ userId });
    }

    public async updatePost(post:IPost, userId:number):Promise<any> {
        const { text } = post;
        return getManager()
            .getRepository(Post)
            .update({ userId }, { text });
    }
}
export const postRepositories = new PostRepositories();
