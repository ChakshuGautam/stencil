import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Get,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FilesService } from './files.service';
import { FastifyFileInterceptor } from 'src/interceptors/file.interceptor';
import { diskStorage } from 'multer';

@ApiTags('Files')
@Controller({
  path: 'files',
  version: '1',
})
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  @UseInterceptors(
    FastifyFileInterceptor('botImage', {
      storage: diskStorage({
        destination: './upload/single',
      }),
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Body() body) {
    await this.filesService.uploadFile(file, body['filepath']);
  }

  @Post()
  async downloadFile(@UploadedFile() file: Express.Multer.File, @Body() body) {
    await this.filesService.downloadFile(file, body['filepath']);
  }

  @Get()
  async listObjects(@Body() body) {
    await this.filesService.listObjects(body['prefix']);
  }

  @Delete()
  async deleteObject(@Body() body) {
    await this.filesService.deleteObject(body['filepath']);
  }
}
