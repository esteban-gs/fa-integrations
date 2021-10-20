import { Body, Controller, HttpService, Logger, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FormDataCovidSafetyDto } from './form-data-covid-safety-dto';

@Controller('form-convert')
export class FormConvertController {
  constructor(private configs: ConfigService, private http: HttpService) {}

  @Post()
  getHello(@Body() submission: any): any {
    console.log(submission);

    const triggerUrl = this.configs.get('REPOST_TO_TRIGGER_URL');

    const response = this.http.post(triggerUrl, submission, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    let result;
    response.toPromise().then((res) => {
      result = res;
    });
    console.log(result);
    return result;
  }
}
