import cron from 'node-cron';
import { userService } from '../services';
import { emailService } from '../services/emailService';
import { emailActionEnum } from '../constants';

export const sendMailUsers = () => {
    cron.schedule('*/30 * * * * *', async () => {
        const getUser = await userService.getUser();
        return getUser.map((user) => emailService.sendMail(
            user.email,
            emailActionEnum.WELCOME,
            { user: user.lastName },
        ));
    });
};
