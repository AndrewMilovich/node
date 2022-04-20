import { Router } from 'express';
import { teacherModel } from '../models/teacher';

const router = Router();

router.post('/', async (req, res, next) => {
    try {
        const createdTeacher = await teacherModel.create(req.body);
        res.json(createdTeacher);
    } catch (e) {
        next(e);
    }
});

router.get('/', async (req, res, next) => {
    try {
        const teacherFromDb = await teacherModel.find();
        res.json(teacherFromDb);
    } catch (e) {
        next(e);
    }
});
export const teacherRouter = router;
