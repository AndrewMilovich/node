import { getManager, Repository } from 'typeorm';
import { Token } from '../../entity/token';
import { IToken, ITokenDataToSave } from '../../interface/token.interface';
import { ITokenRepository } from './tokenRepositori.interface';

class TokenRepository extends Repository<Token> implements ITokenRepository {
    public async createToken(token: ITokenDataToSave): Promise<IToken> {
        return getManager().getRepository(Token).save(token);
    }

    public async findTokenByUserId(userId: number): Promise<IToken | undefined> {
        return getManager().getRepository(Token).findOne({ userId });
    }

    public async deleteByParams(params:Partial<IToken>) {
        return getManager().getRepository(Token).delete(params);
    }
}

export const tokenRepository = new TokenRepository();
