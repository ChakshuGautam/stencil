import { Module } from '@nestjs/common';
import { AppController } from './files.controller';
import { AppService } from './files.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class FilesModule {}
