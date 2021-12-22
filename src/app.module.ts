import { ConfigModule } from '@nestjs/config';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { FormConvertController } from './form-convert/form-convert.controller';
import { FormAdaptorModule } from './form-adapter/form-adapter.module';
import { FormConvertService } from './form-convert/form-convert.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigurationsModule } from './configurations/configurations.module';
import { HealthModule } from './health/health.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { LoggerMiddlewareService } from './shared/logger-middleware/logger-middleware.service';

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
      serveRoot: '/app',
      renderPath: '',
    }),
  ],
  controllers: [FormConvertController],
  providers: [FormConvertService, LoggerMiddlewareService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddlewareService)
      // basically excluding all http reqs requesting static files
      .exclude(
        { path: 'app', method: RequestMethod.ALL },
        { path: '*.js', method: RequestMethod.ALL },
        { path: '*.html', method: RequestMethod.ALL },
        { path: '*.css', method: RequestMethod.ALL },
        { path: '*.png', method: RequestMethod.ALL },
        { path: '*.gif', method: RequestMethod.ALL },
      )
      .forRoutes('*');
  }
}
