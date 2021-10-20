import { Body, Controller, HttpService, Logger, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FormDataCovidSafetyDto } from './form-data-covid-safety-dto';

@Controller('form-convert')
export class FormConvertController {
  constructor(private configs: ConfigService, private http: HttpService) {}

  @Post()
  async getHello(@Body() submission: FormDataCovidSafetyDto): Promise<any> {
    const submissionAsJson = JSON.stringify(submission);
    const deepCopy = JSON.parse(submissionAsJson);
    Logger.verbose(submissionAsJson);

    const triggerUrl = this.configs.get('REPOST_TO_TRIGGER_URL');
    return this.http.post(triggerUrl, deepCopy, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
