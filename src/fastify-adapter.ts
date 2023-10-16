import { Injectable } from '@nestjs/common';
import { FastifyAdapter } from '@nestjs/platform-fastify';

@Injectable()
export class FastifyAppAdapter extends FastifyAdapter {
  constructor() {
    super();
  }
}
