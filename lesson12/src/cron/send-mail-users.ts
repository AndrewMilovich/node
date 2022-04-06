import cron from 'node-cron';
import { userService } from '../services';
import { emailService } from '../services/emailService';
import { emailActionEnum } from '../constants';

export const sendMailUsers = () => {
    cron.schedule('*/30 */30 * * * *', async () => {
        const getUser = await userService.getUser();
        await Promise.allSettled(getUser.map(async (u) => emailService.sendMail(
            u.email,
            emailActionEnum.WELCOME,
            { user: u.lastName },
        )));
    });
};
