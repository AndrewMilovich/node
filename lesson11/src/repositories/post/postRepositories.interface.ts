import { IPost } from '../../interface/post.interface';

export interface PostRepositoriesInterface{
    getPosts():Promise<IPost[]>;
    getPostById(userId:number):Promise<any>;
    updatePost(post:IPost, userId:number):Promise<any>
}
