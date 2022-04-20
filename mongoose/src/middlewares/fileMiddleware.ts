import { NextFunction, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import { IRequestExtendedInterface } from '../interface/requestExtended.interface';
import { constants } from '../constants/constants';
import { ErrorHandler } from '../error/ErrorHandler';

class FileMiddleware {
    async checkUserAvatar(req:IRequestExtendedInterface, res:Response, next:NextFunction) {
        try {
            console.log(req.files);
            if (!req.files?.avatar) {
                next();
                return;
            }
            const { name, size, mimetype } = req.files.avatar as UploadedFile;
            if (size > constants.PHOTO_MAX_SIZE) {
                next(new ErrorHandler(`filesize ${name} is so big`));
                return;
            }
            if (!constants.IMAGES_MIMETYPES.includes(mimetype)) {
                next(new ErrorHandler(`file not ${mimetype}`));
                return;
            }
            next();
        } catch (e) {
            next(e);
        }
    }
}
export const fileMiddleware = new FileMiddleware();
