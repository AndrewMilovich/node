import { NextFunction, Response } from 'express';
import { tokenService, userService } from '../services';
import { IRequestExtendedInterface } from '../interface/requestExtended.interface';
import { tokenRepository } from '../repositories/token/tokenRepository';

class AuthMiddleware {
    public async checkAccessToken(
        req: IRequestExtendedInterface,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const authToken = req.get('Authorization');
            if (!authToken) {
                throw new Error('no token');
            }
            const { userEmail } = tokenService.verifyToken(authToken);
            const tokenPairFromDb = await tokenRepository.findByParams({ accessToken: authToken });
            if (!tokenPairFromDb) {
                throw new Error('no token');
            }
            const userFromToken = await userService.getUserByEmail(userEmail);
            if (!userFromToken) {
                throw new Error('wrong token');
            }
            req.user = userFromToken;
            next();
        } catch (e: any) {
            res.json({
                status: 401,
                message: e.message,
            });
        }
    }
}

export const authMiddleware = new AuthMiddleware();
