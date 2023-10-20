import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { diskStorage } from 'multer';
import { AppService } from './files.service';
import { MultipleFileDto } from './dto/multiple-files-dto';
import { SingleFileDto } from './dto/single-file-dto';
import { FastifyFileInterceptor } from './interceptor/fastify-file-interceptor';
import { FastifyFilesInterceptor } from './interceptor/fastify-files-interceptor';
import { fileMapper, filesMapper } from './utils/file-mapper';
import { editFileName, imageFileFilter } from './utils/file-upload-util';
@Controller()
@ApiTags('Upload File ')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiConsumes('multipart/form-data')
  @Post('upload')
  @UseInterceptors(
    FastifyFileInterceptor('photo_url', {
      storage: diskStorage({
        destination: './upload/single',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  single(
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: SingleFileDto,
  ) {
    return { ...body, photo_url: fileMapper({ file, req }) };
  }

  @ApiConsumes('multipart/form-data')
  @Post('multiple-file')
  @UseInterceptors(
    FastifyFilesInterceptor('photo_url', 10, {
      storage: diskStorage({
        destination: './upload/single',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  multiple(
    @Req() req: Request,
    @UploadedFiles() files: Express.Multer.File[],
    @Body() body: MultipleFileDto,
  ) {
    return { ...body, photo_url: filesMapper({ files, req }) };
  }
}
