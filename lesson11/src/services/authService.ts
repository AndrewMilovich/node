import bcrypt from 'bcrypt';
import { userService } from './userService';
import { IUser } from '../interface/user.interface';
import { tokenService } from './tokenService';

class AuthService {
    public async registration(body: IUser): Promise<any> {
        const { email } = body;
        const userFromDb = await userService.getUserByEmail(email);
        if (userFromDb) {
            throw new Error(`User with email: ${email} already exists`);
        }
        const createdUser = await userService.createUser(body);
        return this._getTokenData(createdUser);
    }

    public async comparePassword(password:string, hash:string):Promise<void | Error> {
        const isPasswordUnique = await bcrypt.compare(password, hash);
        if (!isPasswordUnique) {
            throw new Error('user exist');
        }
    }

    private async _getTokenData(userData: IUser): Promise<any> {
        const { id, email } = userData;
        const tokensPair = await tokenService.generateTokenPair({ userId: id, userEmail: email });
        await tokenService.saveToken(id, tokensPair.refreshToken, tokensPair.accessToken);

        return {
            ...tokensPair,
            userId: id,
            userEmail: email,
        };
    }
}

export const authService = new AuthService();
