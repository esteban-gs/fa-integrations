import {
  BadRequestException,
  Body,
  Controller,
  HttpService,
  InternalServerErrorException,
  Logger,
  Post,
} from '@nestjs/common';
import axios from '@nestjs/common/node_modules/axios';
import { ConfigService } from '@nestjs/config';

@Controller('form-convert')
export class FormConvertController {
  constructor(private configs: ConfigService, private http: HttpService) {}

  @Post()
  async getHello(@Body() submission: any): Promise<any> {
    console.log(submission);
    if (!!!submission.triggerUrlId) {
      return new InternalServerErrorException('triggerUrlId is required');
    }
    const triggerUrl = this.configs.get(
      `REPOST_TO_TRIGGER_URL_${submission.triggerUrlId ?? 'BAB'}`,
    );

    // check for correct url pattern
    const validateDynamicTriggerUrl = triggerUrl
      .toString()
      .includes('.azure.com:443');

    if (!validateDynamicTriggerUrl) {
      return new BadRequestException('trigger url invalid');
    }

    Logger.log('request url', triggerUrl);
    Logger.log('payload', JSON.stringify(submission));
    const response = await this.http
      .post(triggerUrl, submission, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .toPromise();
  }
}
