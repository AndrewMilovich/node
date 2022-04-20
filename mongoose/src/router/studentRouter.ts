import { Router } from 'express';
import { studentModel } from '../models/students';

const router = Router();

router.post('/', async (req, res, next) => {
    try {
        const createdStudent = await studentModel.create(req.body);
        res.json(createdStudent);
    } catch (e) {
        next(e);
    }
});
router.get('/', async (req, res, next) => {
    try {
        const studentsFromDb = await studentModel.find().populate('teacher');
        res.json(studentsFromDb);
    } catch (e) {
        next(e);
    }
});
export const studentRouter = router;
