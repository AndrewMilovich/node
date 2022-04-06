import { EntityRepository, getManager, Repository } from 'typeorm';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { IUser } from '../../interface/user.interface';
import { User } from '../../entity/user';
import { IPagination } from '../../interface/pagination.interface';

dayjs.extend(utc);

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

    public getNewUsers():Promise<IUser[]> {
        return getManager().getRepository(User)
            .createQueryBuilder('user')
            .where(
                'user.createdAt >= :date',
                { date: dayjs().utc().startOf('day').format() },
            )
            .getMany();
    }

    public async getUserPagination(
        searchObject:Partial<IUser> = {},
        limit: number,
        page: number = 1,
    )
        :Promise<IPagination<IUser>> {
        const skip = limit * (page - 1);

        console.log('_____________________________________');
        console.log('_____________________________________');
        console.log(searchObject);
        console.log('_____________________________________');
        console.log('_____________________________________');

        const [users, itemCount] = await getManager().getRepository(User)
            .findAndCount({ where: searchObject, skip, take: limit });

        return {
            page,
            perPage: limit,
            itemCount,
            data: users,
        };
    }
}
export const userRepositories = new UserRepositories();
