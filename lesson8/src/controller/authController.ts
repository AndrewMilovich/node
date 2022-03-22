import { Request, Response } from 'express';

import { authService, tokenService } from '../services';
import { COOKIE } from '../constants/cookie';
import { ITokenData } from '../interface/token.interface';
import { IRequestExtendedInterface } from '../interface/requestExtended.interface';
import { IUser } from '../interface/user.interface';
import { tokenRepository } from '../repositories/token/tokenRepository';

class AuthController {
    public async registration(req: Request, res: Response): Promise<Response<ITokenData>> {
        const data = await authService.registration(req.body);
        res.cookie(
            COOKIE.nameRefreshToken,
            data.refreshToken,
            { maxAge: COOKIE.maxAgeRefreshToken, httpOnly: true },
        );
        return res.json(data);
    }

    public async logout(req: IRequestExtendedInterface, res: Response): Promise<Response<string>> {
        const { id } = req.user as IUser;
        res.clearCookie(COOKIE.nameRefreshToken);
        await tokenService.deleteToken(id);
        return res.json('ok');
    }

    async login(req: IRequestExtendedInterface, res: Response) {
        try {
            const { id, email, password: hashPassword } = req.user as IUser;
            const { password } = req.body;

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
            res.status(400).json(e);
        }
    }
}

export const authController = new AuthController();
