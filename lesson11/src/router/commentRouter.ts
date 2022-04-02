import { Router } from 'express';
import { commentController } from '../controller';

const router = Router();
router.get('/', commentController.getComments);
router.get('/:userId', commentController.getCommentById);
router.patch('/action', commentController.updateCommentAction);

export const commentRouter = router;
