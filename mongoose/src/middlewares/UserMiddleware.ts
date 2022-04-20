import { NextFunction, Response } from 'express';
import { IRequestExtendedInterface } from '../interface/requestExtended.interface';
import { userRepositories } from '../repositories/user/userRepositories';
import { paramsValidator, userValidator } from '../validator';
import { ErrorHandler } from '../error/ErrorHandler';

// import { IUser } from '../interface/user.interface';

class UserMiddleware {
    async checkIsUserExist(
        req: IRequestExtendedInterface,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const userFromDb = await userRepositories.getUserByEmail(req.body.email);
            if (!userFromDb) {
                next(new ErrorHandler('User not found', 400));
                return;
            }
            req.user = userFromDb;
            next();
        } catch (e:any) {
            next(e);
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
                next(new ErrorHandler(error.details[0].message));
                return;
            }
            req.body = value;
            next();
        } catch (e:any) {
            next(e);
        }
    }

    public async chekValidPassword(
        req: IRequestExtendedInterface,
        res: Response,
        next: NextFunction,
    ):Promise<void> {
        try {
            const { password } = req.body;

            const { error, value } = await userValidator.passwordUser.validate({ password });
            if (error) {
                next(new ErrorHandler(error.details[0].message, 401));
                return;
            }
            req.body = value;
            next();
        } catch (e:any) {
            next(e);
        }
    }

    async chekValidEmail(
        req: IRequestExtendedInterface,
        res: Response,
        next: NextFunction,
    ):Promise<void> {
        try {
            const { error, value } = userValidator.emailUser.validate(req.body);
            if (error) {
                next(new ErrorHandler(error.details[0].message, 401));
            }
            req.body = value;
            next();
        } catch (e:any) {
            next(e);
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
                next(new ErrorHandler(error.details[0].message, 401));
            }
            req.body = value;
            next();
        } catch (e:any) {
            next(e);
        }
    }

    async validId(
        req: IRequestExtendedInterface,
        res: Response,
        next: NextFunction,
    ):Promise<void> {
        try {
            const { error, value } = paramsValidator.id.validate(req.params);
            if (error) {
                next(new ErrorHandler('wrong id'));
            }
            req.params = value;
            next();
        } catch (e:any) {
            next(e);
        }
    }
}
export const userMiddleware = new UserMiddleware();
