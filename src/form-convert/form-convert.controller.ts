import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  Logger,
  Post,
  Req,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { map, tap } from 'rxjs';
import { FormConvertService } from './form-convert.service';
import { AxiosResponse } from 'axios';
import { Request } from 'express';

@Controller('form-convert')
export class FormConvertController {
  constructor(
    private configs: ConfigService,
    private serv: FormConvertService,
  ) {}

  @Post()
  async post(@Body() submission: any, @Req() request: Request) {
    const allowed = ['rawHeaders', 'body'];

    for (const key in request) {
      if (allowed.includes(key)) {
        Logger.log(request[key], key);
      }
    }
    if (!!!submission.triggerUrlId || submission.triggerUrlId === '') {
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

    Logger.log(triggerUrl, 'request url');
    const $submit = await this.serv.submit(triggerUrl, submission);
    const $result = $submit.pipe(
      tap((res: AxiosResponse) => {
        Logger.log(res.statusText, 'SUBMIT RESULT');
      }),
      map((res: AxiosResponse) => res.status),
    );
    return $result;
  }
}
