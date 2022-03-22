import { Router } from 'express';
import { authController } from '../controller';
import { authMiddleware, userMiddleware } from '../middlewares';

const route = Router();
route.post('/registration', authController.registration);
route.post('/login', userMiddleware.checkIsUserExist, authController.login);
route.post('/logout', authMiddleware.checkAccessToken, authController.logout);

// route.post('/refresh', authController.refreshing);

export const authRouter = route;
