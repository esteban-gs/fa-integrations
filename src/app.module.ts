import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FormConvertController } from './form-convert/form-convert.controller';

@Module({
  imports: [ConfigModule.forRoot(), HttpModule],
  controllers: [AppController, FormConvertController],
  providers: [AppService],
})
export class AppModule {}
