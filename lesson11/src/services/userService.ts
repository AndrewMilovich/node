import bcrypt from 'bcrypt';
import { config } from '../config/config';
import { IUser } from '../interface/user.interface';
import { userRepositories } from '../repositories/user/userRepositories';

class UserService {
    public async createUser(user: IUser): Promise<IUser> {
        const { password } = user;

        const hashedPassword = await this._hashPassword(password);
        const dataToSave = { ...user, password: hashedPassword };

        return userRepositories.createUser(dataToSave);
    }

    public async getUser():Promise<IUser[]> {
        return userRepositories.getUser();
    }

    public async getUserById(id:number):Promise<IUser> {
        return userRepositories.getUserById(id);
    }

    public async getUserByEmail(email:string):Promise<IUser> {
        return userRepositories.getUserByEmail(email);
    }

    public async updateUser(user:IUser, id:number):Promise<IUser> {
        return userRepositories.updateUser(user, id);
    }

    public async deleteUser(id:number) {
        return userRepositories.deleteUser(id);
    }

    private async _hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, Number(config.USER_SALT_ROUNDS));
    }

    async updateUserPassword(user:Partial<IUser>, id: number):Promise<any | undefined> {
        let { password } = user;
        if (password) {
            password = await this._hashPassword(password);
        }
        return userRepositories.updatePassword(user, id);
    }

    public async getUserPagination(filterObject: any, page: number, perPage: number) {
        return userRepositories.getUserPagination(filterObject, perPage, page);
    }
}
export const userService = new UserService();
