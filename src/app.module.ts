import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FormConvertController } from './form-convert/form-convert.controller';

@Module({
  imports: [ConfigModule.forRoot(), HttpModule],
  controllers: [FormConvertController],
  providers: [],
})
export class AppModule {}
