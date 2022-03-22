"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const user_1 = require("./entity/user");
const post_1 = require("./entity/post");
const comment_1 = require("./entity/comment");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
app.get('/users', async (req, res) => {
    // all users
    const users = await (0, typeorm_1.getManager)().getRepository(user_1.User).find();
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
    const createdUser = await (0, typeorm_1.getManager)()
        .getRepository(user_1.User)
        .update({ id: Number(req.params.id) }, {
        password,
        email,
    });
    res.json(createdUser);
});
// add users
app.post('/users', async (req, res) => {
    const createdUser = await (0, typeorm_1.getManager)().getRepository(user_1.User).save(req.body);
    res.json(createdUser);
});
// delete user
app.delete('/users/:id', async (req, res) => {
    const deleteUser = await (0, typeorm_1.getManager)().getRepository(user_1.User).delete({ id: Number(req.params.id) });
    res.json(deleteUser);
});
// 3)Створіть ендпоінт get /posts/userId - який буде виводити
// пости якогось юзера який їх створив
app.get('/posts/:userId', async (req, res) => {
    const userPost = await (0, typeorm_1.getManager)()
        .getRepository(post_1.Post).find({ userId: Number(req.params.userId) });
    res.json(userPost);
});
// 4)update /posts/userId можна оновити текст про пост
app.patch('/posts/:userId', async (req, res) => {
    const { text } = req.body;
    const createdPost = await (0, typeorm_1.getManager)()
        .getRepository(post_1.Post)
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
    const userComments = await (0, typeorm_1.getManager)()
        .getRepository(comment_1.Comment).find();
    res.json(userComments);
});
// all comments users
app.get('/comments/:userId', async (req, res) => {
    const commentsOfUser = await (0, typeorm_1.getManager)()
        .getRepository(comment_1.Comment)
        .createQueryBuilder('comment')
        .where('comment.authorId = :id', { id: Number(req.params.userId) })
        .leftJoinAndSelect('comment.user', 'user')
        .leftJoinAndSelect('comment.post', 'post')
        .getMany();
    res.json(commentsOfUser);
});
// all posts
app.get('/posts', async (req, res) => {
    // const users = await getManager().getRepository(User).find();
    // console.log(users);
    // res.json(users);
    // its post with comments
    const posts = await (0, typeorm_1.getManager)().getRepository(post_1.Post).find({ relations: ['comments'] });
    res.json(posts);
});
//* 6) update /comments/action написати ендпоінт який буде приймати в
// body commentId, action(like, dislike)
app.patch('/comments', async (req, res) => {
    try {
        const { action, commentId, } = req.body;
        const comment = await (0, typeorm_1.getManager)()
            .getRepository(comment_1.Comment)
            .createQueryBuilder('comment')
            .where(`comment.id=${commentId}`)
            .getOne();
        if (!comment) {
            throw new Error('Wrong comment id');
        }
        if (action === 'like') {
            await (0, typeorm_1.getManager)()
                .getRepository(comment_1.Comment)
                .update({ id: commentId }, { like: comment.like + 1 });
        }
        if (action === 'dislike') {
            await (0, typeorm_1.getManager)()
                .getRepository(comment_1.Comment)
                .update({ id: commentId }, { dislike: comment.dislike + 1 });
        }
        res.sendStatus(201);
    }
    catch (e) {
        console.log(e);
    }
});
app.listen(5000, async () => {
    console.log('Serves has started on PORT: http://localhost:5300');
    try {
        const connection = await (0, typeorm_1.createConnection)();
        if (connection) {
            console.log('Database connected');
        }
    }
    catch (err) {
        if (err)
            console.log(err);
    }
});
//# sourceMappingURL=app.js.map