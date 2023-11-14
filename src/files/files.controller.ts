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
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { Response } from 'express';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Param('destination') destination: string,
    @Body('filename') filename: string,
  ): Promise<{
    statusCode: number;
    message: string;
    file?: { url: string } | undefined;
  }> {
    try {
      const directory = await this.filesService.upload(file, filename);
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
