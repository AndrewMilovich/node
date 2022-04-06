import { Request } from 'express';
import { IUser } from './user.interface';

export interface IRequestExtendedInterface extends Request{
    user?:IUser
}
