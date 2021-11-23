import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { FormConvertController } from './form-convert/form-convert.controller';
import { FormAdaptorModule } from './form-adapter/form-adapter.module';
import { FormConvertService } from './form-convert/form-convert.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigurationsModule } from './configurations/configurations.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    FormAdaptorModule,
    HttpModule,
    ConfigurationsModule,
  ],
  controllers: [FormConvertController],
  providers: [FormConvertService],
})
export class AppModule {}
