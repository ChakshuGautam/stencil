import { Module } from '@nestjs/common';

import { TemporalModule } from 'nestjs-temporal';
import { TemporalController } from './temporal.controller';
import { TemporalService } from './temporal.service';
import { exampleActivity } from './activities/example-activity';
@Module({
  imports: [
    TemporalModule.registerWorker({
      workerOptions: {
        taskQueue: 'default',
        workflowsPath: require.resolve('./workflows/example-workflow'),
        activities: {
          exampleActivity,
        },
      },
    }),
    TemporalModule.registerClient(),
  ],
  controllers: [TemporalController],
  providers: [TemporalService],
})
export class _TemporalModule {}
