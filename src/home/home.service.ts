import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from 'src/config/config.type';
import { CustomLogger } from '../logging/custom-logger'; // Import the CustomLogger

@Injectable()
export class HomeService {
  constructor(
    private configService: ConfigService<AllConfigType>,
  ) {}

  appInfo() {
    // Use the CustomLogger to log a message
    CustomLogger.info('Getting app information', 'HomeService');
    return { name: this.configService.get('app.name', { infer: true }) };
  }
}
