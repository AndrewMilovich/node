import * as Joi from 'joi';
import { regex } from '../constants/regex';

export const userValidator = {
    createUser: Joi.object({
        firstName: Joi
            .string()
            .min(2)
            .max(20)
            .required(),
        lastName: Joi
            .string()
            .min(2)
            .max(20)
            .required(),

        age: Joi
            .number()
            .min(18)
            .max(100)
            .required(),

        phone: Joi
            .string()
            .regex(regex.Phone)
            .required(),
        email: Joi
            .string()
            .regex(regex.Email)
            .required(),
        password: Joi
            .string()
            .regex(regex.Password)
            .required(),
    }),
    loginUser: Joi.object({
        email: Joi
            .string()
            .regex(regex.Email)
            .trim()
            .required()
            .messages({ 'string.pattern.base': 'email not valid' }),

        password: Joi
            .string()
            .regex(regex.Password)
            .trim()
            .required(),
    }),
};
