import { Request, Response } from 'express';

import { authService, tokenService } from '../services';
import { COOKIE } from '../constants/cookie';
import { ITokenData } from '../interface/token.interface';
import { IRequestExtendedInterface } from '../interface/requestExtended.interface';
import { IUser } from '../interface/user.interface';

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
}

export const authController = new AuthController();
