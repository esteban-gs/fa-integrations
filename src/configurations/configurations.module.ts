import { Module } from '@nestjs/common';
import { ConfigurationsService } from './configurations.service';
import { ConfigurationsController } from './configurations.controller';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [ConfigurationsController],
  providers: [ConfigurationsService, ConfigService],
})
export class ConfigurationsModule {}
