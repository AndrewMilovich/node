import jwt from 'jsonwebtoken';
import { IToken, IUserPayload } from '../interface/token.interface';
import { tokenRepository } from '../repositories/token/tokenRepository';
import { config } from '../config/config';

class TokenService {
    public async generateTokenPair(payload: any)
        : Promise<{ accessToken: string, refreshToken: string }> {
        const accessToken = jwt.sign(payload, config.SECRET_ACCESS_KEY as string, { expiresIn: '15m' });
        const refreshToken = jwt.sign(payload, config.EXPIRES_IN_REFRESH as string, { expiresIn: '1d' });
        return {
            accessToken,
            refreshToken,
        };
    }

    public async saveToken(userId: number, refreshToken: string): Promise<IToken> {
        const tokenFromDb = await tokenRepository.findTokenByUserId(userId);
        if (tokenFromDb) {
            tokenFromDb.refreshToken = refreshToken;
            return tokenRepository.createToken(tokenFromDb);
        }
        const token = await tokenRepository.createToken({ refreshToken, userId });
        return token;
    }

    public verifyToken(authToken: string, tokenType = 'access') :IUserPayload {
        let secretWorld = config.SECRET_ACCESS_KEY;
        if (tokenType === 'refresh') {
            secretWorld = config.EXPIRES_IN_REFRESH;
        }
        return jwt.verify(authToken, secretWorld as string) as IUserPayload;
    }

    public async deleteToken(userId:number) {
        return tokenRepository.deleteByParams({ userId });
    }
}
export const tokenService = new TokenService();
