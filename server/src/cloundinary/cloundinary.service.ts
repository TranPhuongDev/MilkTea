// src/cloundinary/cloundinary.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { v2 as cloudinaryType, UploadApiResponse } from 'cloudinary';
import toStream = require('buffer-to-stream');

@Injectable()
export class CloudinaryService {
  constructor(
    @Inject('CLOUDINARY') private readonly cloudinary: typeof cloudinaryType,
  ) {}

  async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      if (!this.cloudinary?.uploader) {
        console.error('Cloudinary uploader is undefined');
        return reject(new Error('Cloudinary not initialized properly'));
      }

      const upload = this.cloudinary.uploader.upload_stream(
        { folder: 'uploads' },
        (error, result) => {
          if (error) return reject(error);
          if (!result)
            return reject(new Error('Upload failed, result is undefined'));
          resolve(result);
        },
      );

      toStream(file.buffer).pipe(upload);
    });
  }
}
