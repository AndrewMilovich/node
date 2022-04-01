import { NextFunction, Response } from 'express';
import { tokenService, userService } from '../services';
import { IRequestExtendedInterface } from '../interface/requestExtended.interface';
import { tokenRepository } from '../repositories/token/tokenRepository';
import { ErrorHandler } from '../error/ErrorHandler';
import { actionTokenRepository } from '../repositories/actionToken/actionTokenRepository';

class AuthMiddleware {
    public async checkAccessToken(
        req: IRequestExtendedInterface,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const authToken = req.get('Authorization');
            if (!authToken) {
                next(new ErrorHandler('no token', 404));
                return;
            }
            const { userEmail } = tokenService.verifyToken(authToken);
            const tokenPairFromDb = await tokenRepository.findByParams({ accessToken: authToken });
            if (!tokenPairFromDb) {
                next(new ErrorHandler('no token', 404));
            }
            const userFromToken = await userService.getUserByEmail(userEmail);
            if (!userFromToken) {
                next(new ErrorHandler('no token', 404));
                return;
            }
            req.user = userFromToken;
            next();
        } catch (e: any) {
            next(e);
        }
    }

    public async checkRefreshToken(
        req: IRequestExtendedInterface,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const authToken = req.get('Authorization');
            if (!authToken) {
                next(new ErrorHandler('no token', 404));
                return;
            }
            const { userEmail } = tokenService.verifyToken(authToken, 'refresh');
            const tokenPairFromDb = await tokenRepository.findByParams({ refreshToken: authToken });
            if (!tokenPairFromDb) {
                next(new ErrorHandler('no token', 404));
                return;
            }
            const userFromToken = await userService.getUserByEmail(userEmail);
            if (!userFromToken) {
                next(new ErrorHandler('no token', 404));
                return;
            }
            req.user = userFromToken;
            next();
        } catch (e: any) {
            next(e);
        }
    }

    public async checkActionToken(
        req: IRequestExtendedInterface,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const actionToken = req.get('Authorization');

            if (!actionToken) {
                next(new ErrorHandler('no token', 404));
                return;
            }
            const { userEmail } = tokenService.verifyToken(actionToken, 'action');

            const tokenFromDb = await actionTokenRepository.findByParams({ actionToken });

            if (!tokenFromDb) {
                next(new ErrorHandler('no token', 404));
                return;
            }
            const userFromToken = await userService.getUserByEmail(userEmail);

            if (!userFromToken) {
                next(new ErrorHandler('no token', 404));
                return;
            }
            req.user = userFromToken;
            next();
        } catch (e: any) {
            next(e);
        }
    }
}

export const authMiddleware = new AuthMiddleware();
