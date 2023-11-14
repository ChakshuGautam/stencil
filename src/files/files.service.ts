import SMCloudStore = require('smcloudstore');
import fastify, { FastifyInstance } from 'fastify';
import * as fs from 'fs/promises';
import * as path from 'path';

interface MinioConfig {
  endPoint: string;
  port: number;
  useSSL: boolean;
  accessKey: string;
  secretKey: string;
  bucketName: string;
}

export class FilesService {
  private readonly storage: any;
  private readonly useMinio: boolean;
  private readonly fastifyInstance: FastifyInstance;

  constructor() {
    this.useMinio = process.env.STORAGE_MODE?.toLowerCase() === 'minio';

    if (this.useMinio) {
      const minioConfig: MinioConfig = {
        endPoint: process.env.STORAGE_ENDPOINT || '',
        port: +(process.env.STORAGE_PORT || '9000'),
        useSSL: process.env.STORAGE_USE_SSL === 'false',
        accessKey: process.env.STORAGE_ACCESS_KEY || '',
        secretKey: process.env.STORAGE_SECRET_KEY || '',
        bucketName: process.env.STORAGE_CONTAINER_NAME || '',
      };
      this.storage = SMCloudStore.Create('minio', minioConfig);
    } else {
      this.fastifyInstance = fastify();
    }
  }

  async upload(file: any, destination: string): Promise<string> {
    try {
      if (this.useMinio) {
        const options = {
          metadata: {
            'Content-Type': file.mimetype,
          },
        };
        await this.storage.putObject(
          process.env.STORAGE_CONTAINER_NAME,
          destination,
          file.buffer,
          options,
        );
        return destination;
      } else {
        const uploadsDir = path.join(process.cwd(), 'uploads');
        const localFilePath = path.join(uploadsDir, destination);

        await fs.mkdir(uploadsDir, { recursive: true });
        await fs.writeFile(localFilePath, file.buffer);
        return destination;
      }
    } catch (error) {
      console.error(`Error uploading file: ${error.message}`);
      throw new Error('File upload failed');
    }
  }

  async download(destination: string): Promise<any> {
    try {
      if (this.useMinio) {
        const fileStream = await this.storage.getObject(
          process.env.STORAGE_CONTAINER_NAME,
          destination,
        );
        return fileStream;
      } else {
        const localFilePath = path.join(__dirname, 'uploads', destination);
        const fileStream = await fs.readFile(localFilePath);
        return fileStream;
      }
    } catch (error) {
      console.error(`Error downloading file: ${error.message}`);
      throw new Error('File download failed');
    }
  }
}
