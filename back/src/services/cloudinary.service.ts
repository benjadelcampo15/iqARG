import { Injectable } from '@nestjs/common';
import * as toStream from 'buffer-to-stream';
import { UploadApiErrorResponse, v2 } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  async uploadImage(file: Express.Multer.File): Promise<UploadApiErrorResponse | any> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream(
        {
          resource_type: 'auto',
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        },
      );

      toStream(file.buffer).pipe(upload);
    });
  }
}