import { EntityRepository, getManager, Repository } from 'typeorm';

import { IUser } from '../../interface/user.interface';
import { User } from '../../entity/user';

@EntityRepository(User)
class UserRepositories extends Repository<User> {
    public async createUser(user:IUser):Promise<IUser> {
        return getManager()
            .getRepository(User)
            .save(user);
    }

    public async getUserById(id:number):Promise<any> {
        return getManager()
            .getRepository(User)
            .find({ id });
    }

    public async getUserByEmail(email:string):Promise<any> {
        return getManager()
            .getRepository(User)
            .createQueryBuilder('user')
            .where('user.email=:email', { email })
            .getOne();
    }

    public async getUser(): Promise<IUser[]> {
        return getManager()
            .getRepository(User)
            .find();
    }

    public async updateUser(user:IUser, id:number):Promise<any> {
        const { email, password } = user;
        return getManager()
            .getRepository(User)
            .update({ id }, { email, password });
    }

    public async updatePassword(user:Partial<IUser>, id:number):Promise<any> {
        const { password } = user;
        return getManager()
            .getRepository(User)
            .update({ id }, { password });
    }

    public async deleteUser(id:number):Promise<any> {
        return getManager()
            .getRepository(User)
            .softDelete({ id });
    }
}
export const userRepositories = new UserRepositories();
