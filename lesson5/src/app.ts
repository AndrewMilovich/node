import 'reflect-metadata';
import express, { Request, Response } from 'express';
import { createConnection, getManager } from 'typeorm';
import { User } from './entity/user';
import { Post } from './entity/post';
import { Comment } from './entity/comment';

const app = express();
app.use(express.json());
app.use(express.urlencoded());

app.get('/users', async (req: Request, res: Response) => {
    // all users
    const users = await getManager().getRepository(User).find();
    console.log(users);
    res.json(users);

    //  users with posts
    // const users = await getManager()
    // .getRepository(User).find({ relations: ['posts'] });
    // res.json(users);

    // filter users on posts

    // const user = await getManager().getRepository(User)
    //     .createQueryBuilder('user')
    //     .leftJoin('Posts', 'posts', 'posts.userId=user.id')
    //     .where('posts.text="new text"')
    //     .getMany();
    // res.json(user);
});
// update user for id
app.patch('/users/:id', async (req, res) => {
    const { password, email } = req.body;
    const createdUser = await getManager()
        .getRepository(User)
        .update({ id: Number(req.params.id) }, {
            password,
            email,
        });
    res.json(createdUser);
});
// add users
app.post('/users', async (req, res) => {
    const createdUser = await getManager().getRepository(User).save(req.body);
    res.json(createdUser);
});
// delete user
app.delete('/users/:id', async (req, res) => {
    const deleteUser = await getManager().getRepository(User).delete({ id: Number(req.params.id) });
    res.json(deleteUser);
});

// 3)Створіть ендпоінт get /posts/userId - який буде виводити
// пости якогось юзера який їх створив
app.get('/posts/:userId', async (req, res) => {
    const userPost = await getManager()
        .getRepository(Post).find({ userId: Number(req.params.userId) });
    res.json(userPost);
});
// 4)update /posts/userId можна оновити текст про пост
app.patch('/posts/:userId', async (req, res) => {
    const { text } = req.body;
    const createdPost = await getManager()
        .getRepository(Post)
        .update({ userId: Number(req.params.userId) }, {
            text,
        });
    res.json(createdPost);
});

// 5)get comments/userId вивести коментарі які належать юзеру
// який їх написав і пости в яких вони написані
// (якщо через квері почитаєте як там зробити мulti select)

// all comments
app.get('/comments', async (req, res) => {
    const userComments = await getManager()
        .getRepository(Comment).find();
    res.json(userComments);
});

// all comments users
app.get('/comments/:userId', async (req, res) => {
    const commentsOfUser = await getManager()
        .getRepository(Comment)
        .createQueryBuilder('comment')
        .where('comment.authorId = :id', { id: Number(req.params.userId) })
        .leftJoinAndSelect('comment.user', 'user')
        .leftJoinAndSelect('comment.post', 'post')
        .getMany();
    res.json(commentsOfUser);
});

// all posts
app.get('/posts', async (req: Request, res: Response) => {
    // const users = await getManager().getRepository(User).find();
    // console.log(users);
    // res.json(users);

    // its post with comments
    const posts = await getManager().getRepository(Post).find({ relations: ['comments'] });
    res.json(posts);
});

//* 6) update /comments/action написати ендпоінт який буде приймати в
// body commentId, action(like, dislike)

app.patch('/comments', async (req: Request, res: Response) => {
    try {
        const {
            action,
            commentId,
        } = req.body;
        const comment = await getManager()
            .getRepository(Comment)
            .createQueryBuilder('comment')
            .where(`comment.id=${commentId}`)
            .getOne();

        if (!comment) {
            throw new Error('Wrong comment id');
        }
        if (action === 'like') {
            await getManager()
                .getRepository(Comment)
                .update(
                    { id: commentId },
                    { like: comment.like + 1 },
                );
        }
        if (action === 'dislike') {
            await getManager()
                .getRepository(Comment)
                .update({ id: commentId }, { dislike: comment.dislike + 1 });
        }

        res.sendStatus(201);
    } catch (e) {
        console.log(e);
    }
});

app.listen(5300, async () => {
    console.log('Serves has started on PORT: http://localhost:5300');

    try {
        const connection = await createConnection();
        if (connection) {
            console.log('Database connected');
        }
    } catch (err) {
        if (err) console.log(err);
    }
});
