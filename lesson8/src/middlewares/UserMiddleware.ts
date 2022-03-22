import { NextFunction, Response } from 'express';
import { IRequestExtendedInterface } from '../interface/requestExtended.interface';
import { userRepositories } from '../repositories/user/userRepositories';

class UserMiddleware {
    async checkIsUserExist(
        req: IRequestExtendedInterface,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const userFromDb = userRepositories.getUserByEmail(req.body.email);
            if (!userFromDb) {
                res.status(400).json('User not found');
                return;
            }
            req.user = await userFromDb;
            next();
        } catch (e) {
            res.status(400).json(e);
        }
    }
}

export const userMiddleware = new UserMiddleware();
