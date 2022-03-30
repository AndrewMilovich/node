import { emailActionEnum } from './enums';

export const emailInfo = {
    [emailActionEnum.WELCOME]: {
        subject: 'Welcome to our site',
        templateName: 'Welcome',
    },

    [emailActionEnum.ACCOUNT_BLOCKED]: {
        subject: 'You account was blocked',
        templateName: 'Block',
    },
};
