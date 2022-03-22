import { Router } from 'express';
import { userController } from '../controller';

const router = Router();
router.post('/', userController.createdUser);
router.post('/email', userController.getUserByEmail);
router.get('/', userController.getUser);
router.get('/:id', userController.getUserById);
router.patch('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

export const userRouter = router;
