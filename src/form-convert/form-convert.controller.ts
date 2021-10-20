import { Body, Controller, HttpService, Logger, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FormDataCovidSafetyDto } from './form-data-covid-safety-dto';

@Controller('form-convert')
export class FormConvertController {
  constructor(private configs: ConfigService, private http: HttpService) {}

  @Post()
  async getHello(@Body() submission: FormDataCovidSafetyDto): Promise<any> {
    const submissionAsJson = JSON.stringify(submission);
    Logger.verbose(JSON.stringify(submission));

    const triggerUrl = this.configs.get('REPOST_TO_TRIGGER_URL');
    return await this.http.post(triggerUrl, submissionAsJson, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
