import { Router } from 'express';
import { userController } from '../controller';
import { userMiddleware } from '../middlewares';

const router = Router();

router.get('/', userController.getUser);
router.get('/:id', userController.getUserById);
router.patch('/:id', userMiddleware.validId, userMiddleware.validUser, userController.updateUser);
router.delete('/:id', userMiddleware.validId, userController.deleteUser);

export const userRouter = router;
