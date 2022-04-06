import cron from 'node-cron';
import { userRepositories } from '../repositories/user/userRepositories';

export const getNewUsers = () => {
    cron.schedule('*/30 * * * * *', async () => {
        const newUsers = await userRepositories.getNewUsers();
        console.log(newUsers);
    });
};
