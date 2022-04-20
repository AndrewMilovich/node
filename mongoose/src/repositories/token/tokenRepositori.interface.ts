import { IToken, ITokenDataToSave } from '../../interface/token.interface';

export interface ITokenRepository {
    createToken(token: ITokenDataToSave): Promise<IToken>;
    findTokenByUserId(userId: number): Promise<IToken | undefined>;
    findByParams(filterObject:Partial<IToken>):Promise<IToken | undefined>;
    deleteByParams(params:Partial<IToken>):Promise<any>;
}
