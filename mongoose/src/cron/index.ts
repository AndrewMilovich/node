// import { getNewUsers } from './get-new-users';
import { sendMailUsers } from './send-mail-users';

export const cronRun = async () => {
    console.log('hello');
    // await getNewUsers();
    await sendMailUsers();
};
