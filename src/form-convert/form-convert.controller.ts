import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  Logger,
  Post,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpStatus } from '@nestjs/common';
import { Http2ServerResponse } from 'http2';
import { catchError, map, tap } from 'rxjs';
import { FormConvertService } from './form-convert.service';
import { AxiosResponse } from 'axios';

@Controller('form-convert')
export class FormConvertController {
  constructor(
    private configs: ConfigService,
    private serv: FormConvertService,
  ) {}

  @Post()
  async post(@Body() submission: any) {
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

    Logger.log(triggerUrl, 'request url');
    // Logger.log(JSON.stringify(submission), 'payload');
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
