import {
  Body,
  Controller,
  HttpCode,
  HttpService,
  Logger,
  Post,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller('form-convert')
export class FormConvertController {
  constructor(private configs: ConfigService, private http: HttpService) {}

  @Post()
  getHello(@Body() submission: any): any {
    console.log(submission);
    const triggerUrl = this.configs.get('REPOST_TO_TRIGGER_URL');

    // use default or value passed
    const dynamicTriggerUrl: string =
      submission.REPOST_TO_TRIGGER_URL ?? triggerUrl;

    // check for correct url pattern
    const validateDynamicTriggerUrl =
      dynamicTriggerUrl.includes('.azure.com:443');

    if (!validateDynamicTriggerUrl) {
      return HttpCode(403);
    }

    const response = this.http.post(dynamicTriggerUrl, submission, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    let result;
    response.toPromise().then((res) => {
      result = res;
      console.log(res);
    });
    return result;
  }
}
