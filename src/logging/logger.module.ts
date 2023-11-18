import { Module } from '@nestjs/common';
import { Logger } from './custom-logger';

@Module({
  providers: [Logger],
  exports: [Logger],
})
export class LoggerModule {}
