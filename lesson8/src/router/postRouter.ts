import { Router } from 'express';
import { postController } from '../controller';

const router = Router();
router.get('/', postController.getPosts);
router.get('/:userId', postController.getPostById);
router.patch('/:userId', postController.updatePost);

export const postRouter = router;
