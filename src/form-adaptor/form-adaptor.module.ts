import { Module } from '@nestjs/common';
import { FormAdaptorService } from './form-adaptor.service';
import { FormAdaptorController } from './form-adaptor.controller';

@Module({
  controllers: [FormAdaptorController],
  providers: [FormAdaptorService],
})
export class FormAdaptorModule {}
