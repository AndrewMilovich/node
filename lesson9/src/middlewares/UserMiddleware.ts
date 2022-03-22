import { NextFunction, Response } from 'express';
import { IRequestExtendedInterface } from '../interface/requestExtended.interface';
import { userRepositories } from '../repositories/user/userRepositories';
import { userValidator } from '../validator/userValidator';
// import { IUser } from '../interface/user.interface';

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

    async validUser(
        req: IRequestExtendedInterface,
        res: Response,
        next: NextFunction,
    ):Promise<void> {
        try {
            const { error, value } = userValidator.createUser.validate(req.body);
            if (error) {
                throw new Error(error.details[0].message);
            }
            req.body = value;
            next();
        } catch (e:any) {
            res.status(400).json(e.message);
        }
    }

    async validLogin(
        req: IRequestExtendedInterface,
        res: Response,
        next: NextFunction,
    ):Promise<void> {
        try {
            const { error, value } = userValidator.loginUser.validate(req.body);
            if (error) {
                throw new Error('wrong email or password');
            }
            req.body = value;
            next();
        } catch (e:any) {
            res.status(400).json(e.message);
        }
    }
    // public checkUser(
    //     req: IRequestExtendedInterface,
    //     res: Response,
    //     next: NextFunction,
    // ) {
    //     try {
    //         const {
    //             firstName, lastName, password, email, age, phone,
    //         } = req.body as IUser;
    //         if (!firstName || !lastName || !password || !email || !phone || !age) {
    //             throw new Error('enter all fields!!!');
    //         }
    //         next();
    //     } catch (e:any) {
    //         res.status(400).json(e.message);
    //     }
    // }
}
export const userMiddleware = new UserMiddleware();
