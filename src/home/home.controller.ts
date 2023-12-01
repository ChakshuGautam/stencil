import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { HomeService } from './home.service';
import { ResponseTimeInterceptor } from '@techsavvyash/nestjs-monitor';

@ApiTags('Home')
@Controller()
export class HomeController {
  constructor(private service: HomeService) {}

  @UseInterceptors(
    new ResponseTimeInterceptor(
      'home',
      'monitor/grafana/provisioning/dashboards/response_times.json',
    ),
  )
  @Get('/someroute')
  appInfo() {
    return this.service.appInfo();
  }
}
