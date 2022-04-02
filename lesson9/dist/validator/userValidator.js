"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidator = void 0;
const Joi = __importStar(require("joi"));
const regex_1 = require("../constants/regex");
exports.userValidator = {
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
            .regex(regex_1.regex.Phone)
            .required(),
        email: Joi
            .string()
            .regex(regex_1.regex.Email)
            .required(),
        password: Joi
            .string()
            .regex(regex_1.regex.Password)
            .required(),
    }),
    loginUser: Joi.object({
        email: Joi
            .string()
            .regex(regex_1.regex.Email)
            .trim()
            .required()
            .messages({ 'string.pattern.base': 'email not valid' }),
        password: Joi
            .string()
            .regex(regex_1.regex.Password)
            .trim()
            .required(),
    }),
};
//# sourceMappingURL=userValidator.js.map