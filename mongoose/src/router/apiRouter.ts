import { Router } from 'express';
import { userRouter } from './userRouter';
import { postRouter } from './postRouter';
import { commentRouter } from './commentRouter';
import { authRouter } from './authRouter';
import { studentRouter } from './studentRouter';
import { teacherRouter } from './teacherRouter';

const router = Router();

router.use('/users', userRouter);
router.use('/posts', postRouter);
router.use('/comments', commentRouter);
router.use('/auth', authRouter);
router.use('/students', studentRouter);
router.use('/teacher', teacherRouter);

// @ts-ignore
router.use('*', (err, req, res, next) => {
    res.status(err.status || 500)
        .json(err.message);
    console.log(err.message);
});

export const apiRouter = router;
