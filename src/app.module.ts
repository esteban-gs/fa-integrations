import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FormConvertController } from './form-convert/form-convert.controller';

@Module({
  imports: [NestjsFormDataModule, ConfigModule.forRoot(), HttpModule],
  controllers: [AppController, FormConvertController],
  providers: [AppService],
})
export class AppModule {}