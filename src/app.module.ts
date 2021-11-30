import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { FormConvertController } from './form-convert/form-convert.controller';
import { FormAdaptorModule } from './form-adapter/form-adapter.module';
import { FormConvertService } from './form-convert/form-convert.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigurationsModule } from './configurations/configurations.module';
import { HealthModule } from './health/health.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot(),
    FormAdaptorModule,
    HttpModule,
    ConfigurationsModule,
    HealthModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'fa-integrations-ui/dist/'),
      exclude: ['/api*'],
    }),
  ],
  controllers: [FormConvertController],
  providers: [FormConvertService],
})
export class AppModule {}
