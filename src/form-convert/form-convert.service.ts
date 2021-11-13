import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';

@Injectable()
export class FormConvertService {
  constructor(private httpService: HttpService) {}

  submit(triggerUrl: string, submission: any): Observable<AxiosResponse<any>> {
    return this.httpService.post(triggerUrl, submission, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
