import { NextFunction, Request, Response } from 'express';

import { UploadedFile } from 'express-fileupload';
import { authService, tokenService, userService } from '../services';
import { COOKIE, emailActionEnum } from '../constants';
import { IRequestExtendedInterface } from '../interface/requestExtended.interface';
import { IUser } from '../interface/user.interface';
import { tokenRepository } from '../repositories/token/tokenRepository';
import { emailService } from '../services/emailService';
import { ActionTokenTypes } from '../enums/ActionTokenTypes';
import { actionTokenRepository } from '../repositories/actionToken/actionTokenRepository';
import { s3Service } from '../services/s3.service';

class AuthController {
    public async registration(req: Request, res: Response, next:NextFunction) {
        try {
            const createdUser = await userService.createUser(req.body);
            const avatar = req.files?.avatar as UploadedFile;
            if (avatar) {
                const sendData = await s3Service.uploadFile(avatar, 'user', createdUser.id);
                console.log(sendData);
            }
            const tokenData = await authService.getTokenData(createdUser);

            res.json(tokenData);
        } catch (e) {
            next(e);
        }
    }

    public async logout(req: IRequestExtendedInterface, res: Response): Promise<Response<string>> {
        const { id } = req.user as IUser;
        res.clearCookie(COOKIE.nameRefreshToken);
        await tokenService.deleteToken(id);
        return res.json('ok');
    }

    async login(req: IRequestExtendedInterface, res: Response, next: NextFunction) {
        try {
            const {
                id, lastName, email, password: hashPassword,
            } = req.user as IUser;
            const { password } = req.body;
            await emailService.sendMail(email, emailActionEnum.WELCOME, { user: lastName });
            await authService.comparePassword(password, hashPassword);
            const { refreshToken, accessToken } = tokenService.generateTokenPair(
                { userId: id, userEmail: email },
            );
            await tokenRepository.createToken({ refreshToken, accessToken, userId: id });

            res.json({
                refreshToken,
                accessToken,
                user: req.user,
            });
        } catch (e) {
            next(e);
        }
    }

    async refresh(req: IRequestExtendedInterface, res: Response, next: NextFunction) {
        try {
            const { id, email } = req.user as IUser;
            const token = req.get('Authorization');
            await tokenService.deleteTokenPairByParams({ refreshToken: token });

            const {
                refreshToken,
                accessToken,
            } = await tokenService.generateTokenPair({ userId: id, userEmail: email });

            await tokenRepository.createToken({ refreshToken, accessToken, userId: id });

            res.json({
                refreshToken,
                accessToken,
                user: req.user,
            });
        } catch (e) {
            next(e);
        }
    }

    async sendForgotPassword(req: IRequestExtendedInterface, res: Response, next: NextFunction) {
        try {
            const { id, email, lastName } = req.user as IUser;

            const token = tokenService.generateActionToken({ userId: id, userEmail: email });
            await actionTokenRepository.createActionToken({
                actionToken: token,
                type: ActionTokenTypes.forgotPassword,
                userId: id,
            });

            await emailService.sendMail(email, emailActionEnum.FORGOT_PASSWORD, {
                token,
                user: lastName,
            });

            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    }

    async setPassword(req: IRequestExtendedInterface, res: Response, next: NextFunction) {
        try {
            const { id } = req.user as IUser;
            const actionToken = req.get('Authorization');

            await userService.updateUserPassword(req.body, id);
            await actionTokenRepository.deleteByParams({ actionToken });

            res.sendStatus(201);
        } catch (e) {
            next(e);
        }
    }
}

export const authController = new AuthController();
