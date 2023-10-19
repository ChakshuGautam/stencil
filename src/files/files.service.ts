/* eslint-disable no-restricted-syntax */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as SMCloudStore from 'smcloudstore';
import * as fs from 'fs';

@Injectable()
export class FilesService {
  private storage;
  private container = this.configService.get('STORAGE_CONTAINER_NAME');
  private provider =
    this.configService.get<string>('app.provider', { infer: true }) || 'minio';
  constructor(private readonly configService: ConfigService) {
    const connection = {
      endPoint: this.configService.get<string>('STORAGE_ENDPOINT'),
      port: this.configService.get<number>('STORAGE_PORT'), // Replace 'STORAGE_PORT' with the actual key for the port.
      useSSL: this.configService.get<boolean>('STORAGE_USE_SSL'), // Replace 'USE_SSL' with the actual key for SSL configuration.
      accessKey: this.configService.get<string>('STORAGE_ACCESS_KEY'), // Replace 'ACCESS_KEY' with the actual key for the access key.
      secretKey: this.configService.get<string>('STORAGE_SECRET_KEY'), // Replace 'SECRET_KEY' with the actual key for the secret key.
    };
    this.storage = SMCloudStore.Create(this.provider, connection);
  }
  async onApplicationBootstrap() {
    this.container = await this.storage.createContainer(this.container);
  }

  async uploadFile(
    file: Express.Multer.File | Express.MulterS3.File,
    filepath,
  ): Promise<any> {
    if (!file) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            file: 'selectFile',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const fileStream = fs.createReadStream(file.path);
    const upload = this.storage.uploadFile(
      this.container,
      filepath,
      fileStream,
    );

    return await new Promise((resolve, reject) => {
      try {
        return resolve(upload);
      } catch (error) {
        return reject(error);
      }
    });
  }

  async downloadFile(filepath, ttl) {
    if (ttl) {
      return await this.storage.presignedGetUrl(this.container, filepath, ttl);
    }
    return await this.storage.getObject(this.container, filepath);
  }

  async listObjects(prefix) {
    return await this.storage.listObjects(this.container, prefix);
  }

  async deleteObject(filepath) {
    return await this.storage.deleteObject(this.container, filepath);
  }
}
