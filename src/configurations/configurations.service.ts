import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Configuration } from './models/Configuration';

@Injectable()
export class ConfigurationsService {
  constructor(private readonly configs: ConfigService) {}

  public getAllPublicConfigs(): Configuration[] {
    const selectors: string[] = ['APP_REST_DB_URL', 'APP_REST_DB_API_KEY'];
    const configs: Configuration[] = [];

    selectors.forEach((selector: string) => {
      configs.push({ key: selector, value: this.configs.get(selector) });
    });

    return configs;
  }
}
