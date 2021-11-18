import { Module } from '@nestjs/common';
import { FormAdaptorService } from './form-adapter.service';
import { FormAdapterController } from './form-adapter.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [FormAdapterController],
  imports: [HttpModule, ConfigModule],
  providers: [FormAdaptorService],
})
export class FormAdaptorModule {}
