import jwt from 'jsonwebtoken';
import { IToken, ITokenPair, IUserPayload } from '../interface/token.interface';
import { tokenRepository } from '../repositories/token/tokenRepository';
import { config } from '../config/config';

class TokenService {
    public generateTokenPair(payload: IUserPayload)
        : ITokenPair {
        const accessToken = jwt.sign(payload, config.SECRET_ACCESS_KEY as string, { expiresIn: '15m' });
        const refreshToken = jwt.sign(payload, config.EXPIRES_IN_REFRESH as string, { expiresIn: '1d' });
        return {
            accessToken,
            refreshToken,
        };
    }

    public async saveToken(userId: number, refreshToken: string, accessToken:string)
        : Promise<IToken> {
        const tokenFromDb = await tokenRepository.findTokenByUserId(userId);
        if (tokenFromDb) {
            tokenFromDb.refreshToken = refreshToken;
            tokenFromDb.accessToken = accessToken;
            return tokenRepository.createToken(tokenFromDb);
        }
        const token = await tokenRepository.createToken({ refreshToken, accessToken, userId });
        return token;
    }

    public verifyToken(authToken: string, tokenType = 'access') :IUserPayload {
        let secretWorld = config.SECRET_ACCESS_KEY;

        if (tokenType === 'refresh') {
            secretWorld = config.SECRET_REFRESH_KEY;
        }
        if (tokenType === 'action') {
            secretWorld = config.SECRET_ACTION_KEY;
        }
        return jwt.verify(authToken, secretWorld as string) as IUserPayload;
    }

    public async deleteToken(userId:number) {
        return tokenRepository.deleteByParams({ userId });
    }

    public async deleteTokenPairByParams(searchObject:Partial<IToken>) {
        return tokenRepository.deleteByParams(searchObject);
    }

    public generateActionToken(payload: IUserPayload): string {
        return jwt.sign(
            payload,
config.SECRET_ACTION_KEY as string,
{ expiresIn: config.EXPIRES_IN_ACTION },
        );
    }
}
export const tokenService = new TokenService();
