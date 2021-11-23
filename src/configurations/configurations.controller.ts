import { Controller, Get, UseGuards } from '@nestjs/common';
import { ConfigurationsService } from './configurations.service';
import { ClientKeyGuard } from 'src/guards/client-key.guard';
import { Configuration } from './models/Configuration';

@Controller('configurations')
export class ConfigurationsController {
  constructor(private readonly configurationsService: ConfigurationsService) {}

  @UseGuards(ClientKeyGuard)
  @Get()
  getPublicConfigurations(): Configuration[] {
    return this.configurationsService.getAllPublicConfigs();
  }
}
