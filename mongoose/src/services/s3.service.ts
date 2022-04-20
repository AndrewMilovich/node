import S3, { ManagedUpload } from 'aws-sdk/clients/s3';
import { UploadedFile } from 'express-fileupload';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { config } from '../config/config';

class S3Service {
    Bucket;

    constructor() {
        this.Bucket = new S3({
            region: config.REGION,
            accessKeyId: config.ACCESS_KEY_ID,
            secretAccessKey: config.SECRET_ACCESS_ID,
        });
    }

    uploadFile(file: UploadedFile, itemType: string, itemId: number)
        :Promise<ManagedUpload.SendData> {
        const filePath = this.filePathBuilder(file.name, itemType, itemId);
        return this.Bucket.upload({
            Bucket: config.S3_NAME as string,
            Body: file.data,
            Key: filePath,
            ContentType: file.mimetype,
            ACL: 'public-read',
        })
            .promise();
    }

    private filePathBuilder(fileName: string, itemType: string, itemId: number): string {
        const fileExtension = path.extname(fileName);
        return `${itemType}/${itemId}/${uuidv4()}${fileExtension}`;
    }
}

export const s3Service = new S3Service();
