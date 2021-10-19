import { Body, Controller, HttpService, Logger, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FormDataRequest } from 'nestjs-form-data';
import { FormDataCovidSafetyDto } from './form-data-covid-safety-dto';

@Controller('form-convert')
export class FormConvertController {
  constructor(private configs: ConfigService, private http: HttpService) {}

  @Post()
  @FormDataRequest()
  async getHello(@Body() submission: FormDataCovidSafetyDto) {
    const submissionAsJson = JSON.stringify(submission);
    Logger.verbose(JSON.stringify(submission));

    const triggerUrl = this.configs.get('REPOST_TO_TRIGGER_URL');
    return await this.http.post(triggerUrl, submission);
  }
}
