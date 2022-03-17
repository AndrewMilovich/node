import { Router } from 'express';
import { authController } from '../controller';
import { authMiddleware } from '../middlewares/authMiddleware';

const route = Router();
route.post('/registration', authController.registration);
route.post('/logout', authMiddleware.checkAccessToken, authController.logout);
// route.post('/login', authController.logination);
// route.post('/refresh', authController.refreshing);

export const authRouter = route;
