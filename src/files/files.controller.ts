import { FilesService } from './files.service';
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Param,
  Get,
  Res,
  Body,
  Query
} from '@nestjs/common';
import { FastifyFileInterceptor, MultipartFile } from './files.interceptor';
import { Express } from 'express';
import { Response } from 'express';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @UseInterceptors(FastifyFileInterceptor('file', {}))
  async uploadFile(
    @UploadedFile() file: MultipartFile,
    @Query('destination') destination: string, // Use @Query to retrieve the destination from the query parameters
    @Body('filename') filename: string,
  ): Promise<{
    statusCode: number;
    message: string;
    file?: { url: string } | undefined;
  }> {
    try {
      const directory = await this.filesService.upload(file, destination);
      return {
        statusCode: 200,
        message: 'File uploaded successfully',
        file: { url: directory },
      };
    } catch (error) {
      console.error(`Error uploading file: ${error.message}`);
      return {
        statusCode: 500,
        message: 'File upload failed',
        file: undefined,
      };
    }
  }

  @Get('download/:destination')
  async downloadFile(
    @Param('destination') destination: string,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const fileStream = await this.filesService.download(destination);
      res.set({
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename=${destination}`,
      });
      fileStream.pipe(res);
    } catch (error) {
      console.error(`Error downloading file: ${error.message}`);
      res.status(500).send('File download failed');
    }
  }
}
