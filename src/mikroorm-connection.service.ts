import config from '../mikro-orm.config';

import { IDatabaseDriver, Connection } from '@mikro-orm/core';
import {
  MikroOrmModuleOptions,
  MikroOrmOptionsFactory,
} from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MikroormConnectionService implements MikroOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createMikroOrmOptions():
    | MikroOrmModuleOptions<IDatabaseDriver<Connection>>
    | Promise<MikroOrmModuleOptions<IDatabaseDriver<Connection>>> {
    return { ...config };
  }
}
