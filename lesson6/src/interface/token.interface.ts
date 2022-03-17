import { ICommonFields } from './icommonFields';

export interface ITokenDataToSave {
    refreshToken: string;
    userId: number;
}
export interface ITokenPair {
    accessToken: string;
    refreshToken: string;
}

export interface IUserPayload {
    userId: number,
    userEmail: string,
}
export interface IToken extends ICommonFields{
    refreshToken: string;
    userId: number;
}
export type ITokenData = ITokenPair & IUserPayload;
