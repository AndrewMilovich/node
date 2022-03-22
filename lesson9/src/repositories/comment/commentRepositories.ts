import { getManager } from 'typeorm';
import * as http from 'http';
import { IComments } from '../../interface/comments.interface';
import { Comment } from '../../entity/comment';

class CommentRepositories {
    public async getComments(): Promise<IComments[]> {
        return getManager()
            .getRepository(Comment)
            .find();
    }

    public async getCommentById(userId: number): Promise<any> {
        return getManager()
            .getRepository(Comment)
            .createQueryBuilder('comment')
            .where('comment.authorId = :id', { userId })
            .leftJoinAndSelect('comment.user', 'user')
            .leftJoinAndSelect('comment.post', 'post')
            .getMany();
    }

    public async updateCommentsAction(action: string, id: number): Promise<any> {
        try {
            const comment = await getManager()
                .getRepository(Comment)
                .createQueryBuilder('comment')
                .where(`comment.id=${id}`)
                .getOne();
            if (!comment) {
                return 'wrong id comment';
            }
            if (action === 'like') {
                await getManager()
                    .getRepository(Comment)
                    .update(
                        { id },
                        { like: comment.like + 1 },
                    );
            }
            if (action === 'dislike') {
                await getManager()
                    .getRepository(Comment)
                    .update({ id }, { dislike: comment.dislike + 1 });
            }
            return http.STATUS_CODES['201'];
        } catch (e: any) {
            return e.messages;
        }
    }
}

export const commentRepositories = new CommentRepositories();
