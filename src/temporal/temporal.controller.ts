import { Controller, Get, Query } from '@nestjs/common';
import { TemporalService } from './temporal.service';

@Controller('temporal')
export class TemporalController {
  constructor(private readonly temporalService: TemporalService) {}
  @Get()
  async startWorkflow(@Query('name') name: string): Promise<string> {
    try {
      const result = await this.temporalService.startWorkflow(name);
      return `Workflow started, result: ${result}`;
    } catch (error) {
      console.error('Error starting workflow', error);
      throw error;
    }
  }
}
